import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Custom Easing
const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function IntertwiningDrops() {
    const groupRef = useRef()
    const drop1Ref = useRef()
    const drop2Ref = useRef()
    const drop2MaterialRef = useRef()
    const { size } = useThree()

    // Brand colors
    const blackColor = new THREE.Color('#1a1a1a')
    const orangeColor = new THREE.Color('#F9452D')

    // Simple teardrop shape
    const dropShape = useMemo(() => {
        const shape = new THREE.Shape()

        // Classic water drop - round bottom, pointed top
        shape.moveTo(0, 0.8)  // tip

        // Right side curve down
        shape.bezierCurveTo(0.15, 0.6, 0.45, 0.2, 0.45, -0.15)
        // Round bottom
        shape.bezierCurveTo(0.45, -0.5, 0.25, -0.7, 0, -0.7)
        // Left side back up
        shape.bezierCurveTo(-0.25, -0.7, -0.45, -0.5, -0.45, -0.15)
        shape.bezierCurveTo(-0.45, 0.2, -0.15, 0.6, 0, 0.8)

        return shape
    }, [])

    // Helper to convert screen position to 3D world position
    const screenToWorld = (screenX, screenY, camera, targetZ = 0) => {
        const ndcX = (screenX / window.innerWidth) * 2 - 1
        const ndcY = -(screenY / window.innerHeight) * 2 + 1
        const vector = new THREE.Vector3(ndcX, ndcY, 0.5)
        vector.unproject(camera)
        const dir = vector.sub(camera.position).normalize()
        const distance = (targetZ - camera.position.z) / dir.z
        return camera.position.clone().add(dir.multiplyScalar(distance))
    }

    useFrame(({ camera }) => {
        if (!groupRef.current || !drop1Ref.current || !drop2Ref.current) return

        const scrollY = window.scrollY
        const maxScroll = document.body.scrollHeight - window.innerHeight
        const progress = Math.min(1, Math.max(0, scrollY / maxScroll))

        const isMobile = window.innerWidth < 768

        // --- VISIBILITY: Fade in after scroll starts, fade out at end ---
        let opacity = 0
        if (progress > 0.02 && progress < 0.92) {
            if (progress < 0.08) {
                opacity = (progress - 0.02) / 0.06
            } else if (progress > 0.85) {
                opacity = 1 - (progress - 0.85) / 0.07
            } else {
                opacity = 1
            }
        }

        // Apply opacity
        if (drop1Ref.current.children[0]?.material) {
            drop1Ref.current.children[0].material.opacity = opacity * 0.9
        }
        if (drop2MaterialRef.current) {
            drop2MaterialRef.current.opacity = opacity * 0.9
        }

        // --- POSITION: 3 phases like before ---
        // Phase 1 (0-60%): Start near navbar button → go LEFT
        // Phase 2 (60-85%): Go RIGHT toward center
        // Phase 3 (85-100%): Converge to contact button

        let targetX, targetY

        // Positions for each phase
        const startPos = isMobile
            ? { x: 1.5, y: 2.5 }   // Near navbar button
            : { x: 3.5, y: 2.5 }

        const leftPos = isMobile
            ? { x: -1.5, y: 0.5 }  // Left side
            : { x: -4.5, y: 0 }

        const rightPos = isMobile
            ? { x: 0, y: -0.5 }    // Center/right
            : { x: 0, y: -1.0 }

        if (progress < 0.6) {
            // Phase 1: Start → Left
            const p = easeInOutCubic(progress / 0.6)
            targetX = startPos.x + (leftPos.x - startPos.x) * p
            targetY = startPos.y + (leftPos.y - startPos.y) * p
        } else if (progress < 0.85) {
            // Phase 2: Left → Right/Center
            const p = easeInOutCubic((progress - 0.6) / 0.25)
            targetX = leftPos.x + (rightPos.x - leftPos.x) * p
            targetY = leftPos.y + (rightPos.y - leftPos.y) * p
        } else {
            // Phase 3: Right → Contact button
            const p = easeInOutCubic((progress - 0.85) / 0.15)
            const contactBtn = document.getElementById('contact-button')

            let endX = rightPos.x
            let endY = -2.5

            if (contactBtn) {
                const rect = contactBtn.getBoundingClientRect()
                const pos = screenToWorld(rect.left + rect.width / 2, rect.top + rect.height / 2, camera, 0)
                endX = pos.x
                endY = pos.y
            }

            targetX = rightPos.x + (endX - rightPos.x) * p
            targetY = rightPos.y + (endY - rightPos.y) * p
        }

        groupRef.current.position.x = targetX
        groupRef.current.position.y = targetY

        // --- SPIRAL/INTERTWINE ---
        const rotations = 3
        const angle = progress * Math.PI * 2 * rotations

        // Orbit radius - expands in middle, shrinks at edges
        const midExpansion = Math.sin(progress * Math.PI)
        const baseOrbit = 0.2
        const maxExpand = isMobile ? 0.7 : 1.0
        const orbitRadius = baseOrbit + midExpansion * maxExpand

        // Drop 1
        drop1Ref.current.position.x = Math.cos(angle) * orbitRadius
        drop1Ref.current.position.y = Math.sin(angle) * orbitRadius
        drop1Ref.current.rotation.z = angle + Math.PI

        // Drop 2 (opposite)
        drop2Ref.current.position.x = Math.cos(angle + Math.PI) * orbitRadius
        drop2Ref.current.position.y = Math.sin(angle + Math.PI) * orbitRadius
        drop2Ref.current.rotation.z = angle

        // Scale
        const scale = 0.8 + midExpansion * 0.2
        drop1Ref.current.scale.setScalar(scale)
        drop2Ref.current.scale.setScalar(scale)

        // --- COLOR CHANGE: Black → Orange after Parallax section ---
        if (drop2MaterialRef.current) {
            const parallaxSection = document.querySelector('.parallax-showcase')
            if (parallaxSection) {
                const rect = parallaxSection.getBoundingClientRect()
                const pastParallax = rect.bottom < window.innerHeight * 0.5
                const targetColor = pastParallax ? orangeColor : blackColor
                drop2MaterialRef.current.color.lerp(targetColor, 0.08)
            }
        }
    })

    return (
        <group ref={groupRef}>
            {/* Drop 1 - White (transparent) */}
            <group ref={drop1Ref}>
                <mesh>
                    <shapeGeometry args={[dropShape]} />
                    <meshBasicMaterial
                        color="#ffffff"
                        side={THREE.DoubleSide}
                        transparent={true}
                        opacity={0}
                    />
                </mesh>
            </group>

            {/* Drop 2 - Black/Orange (transparent) */}
            <group ref={drop2Ref}>
                <mesh>
                    <shapeGeometry args={[dropShape]} />
                    <meshBasicMaterial
                        ref={drop2MaterialRef}
                        color="#1a1a1a"
                        side={THREE.DoubleSide}
                        transparent={true}
                        opacity={0}
                    />
                </mesh>
            </group>
        </group>
    )
}

export default function Scroll3DScene() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
            pointerEvents: 'none'
        }}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                style={{ pointerEvents: 'none' }}
            >
                <IntertwiningDrops />
            </Canvas>
        </div>
    )
}


/* ==============================================
   COMMENTED CODE - B/D Logo Shapes (for future)
   ==============================================

function LogoShapes() {
    const groupRef = useRef()
    const bRef = useRef()
    const dRef = useRef()
    const { camera, size } = useThree()

    // "B" - Two rounded lobes, flat left side with concave curve on right
    const bShape = useMemo(() => {
        const shape = new THREE.Shape()
        shape.moveTo(-0.35, 1.1)
        shape.bezierCurveTo(-0.1, 1.15, 0.15, 1.0, 0.25, 0.75)
        shape.bezierCurveTo(0.35, 0.5, 0.3, 0.25, 0.15, 0.05)
        shape.bezierCurveTo(0.05, -0.1, 0.1, -0.2, 0.2, -0.35)
        shape.bezierCurveTo(0.4, -0.55, 0.35, -0.85, 0.15, -1.0)
        shape.bezierCurveTo(-0.05, -1.15, -0.35, -1.1, -0.5, -0.95)
        shape.bezierCurveTo(-0.65, -0.75, -0.6, -0.4, -0.55, -0.1)
        shape.bezierCurveTo(-0.5, 0.2, -0.55, 0.5, -0.55, 0.75)
        shape.bezierCurveTo(-0.55, 0.95, -0.5, 1.05, -0.35, 1.1)
        return shape
    }, [])

    // "D" - Organic drop/comma shape
    const dShape = useMemo(() => {
        const shape = new THREE.Shape()
        shape.moveTo(-0.45, 0.7)
        shape.bezierCurveTo(-0.2, 0.75, 0.1, 0.6, 0.3, 0.35)
        shape.bezierCurveTo(0.55, 0.05, 0.6, -0.3, 0.5, -0.6)
        shape.bezierCurveTo(0.4, -0.9, 0.1, -1.1, -0.2, -1.1)
        shape.bezierCurveTo(-0.5, -1.1, -0.75, -0.9, -0.8, -0.55)
        shape.bezierCurveTo(-0.85, -0.2, -0.75, 0.15, -0.55, 0.4)
        shape.bezierCurveTo(-0.4, 0.55, -0.45, 0.65, -0.45, 0.7)
        return shape
    }, [])

    useFrame((state) => {
        if (!groupRef.current) return

        const time = state.clock.elapsedTime
        const scrollY = window.scrollY
        const maxScroll = document.body.scrollHeight - window.innerHeight
        const progress = Math.min(1, Math.max(0, scrollY / maxScroll))

        let targetPos = new THREE.Vector3()
        let targetScale = 1

        const isMobile = window.innerWidth < 768

        const startPos = isMobile ? new THREE.Vector3(1.5, 2, 0) : new THREE.Vector3(3.5, 2, 0)
        const midPos = isMobile ? new THREE.Vector3(-1.5, 0.5, 0) : new THREE.Vector3(-5.0, 0, 0)
        const preEndPos = isMobile ? new THREE.Vector3(0, -0.5, 1) : new THREE.Vector3(0, -1.0, 1.5)

        if (progress < 0.6) {
            const p = progress / 0.6
            const eased = easeInOutCubic(p)
            targetPos.lerpVectors(startPos, midPos, eased)
            targetScale = 1
        } else if (progress < 0.85) {
            const p = (progress - 0.6) / 0.25
            const eased = easeInOutCubic(p)
            targetPos.lerpVectors(midPos, preEndPos, eased)
            targetScale = 1 + (0.1 * eased)
        } else {
            const p = (progress - 0.85) / 0.15
            const eased = easeInOutCubic(p)
            const button = document.getElementById('contact-button')

            if (button) {
                const rect = button.getBoundingClientRect()
                const buttonX = rect.left + rect.width / 2
                const buttonY = rect.top + rect.height / 2
                const ndcX = (buttonX / size.width) * 2 - 1
                const ndcY = -(buttonY / size.height) * 2 + 1

                const vector = new THREE.Vector3(ndcX, ndcY, 0.5)
                vector.unproject(camera)
                const dir = vector.sub(camera.position).normalize()
                const targetZ = isMobile ? 2.0 : 3.5
                const distanceToPlane = (targetZ - camera.position.z) / dir.z
                const worldPos = camera.position.clone().add(dir.multiplyScalar(distanceToPlane))

                const phase2End = isMobile ? new THREE.Vector3(0, -0.5, 1) : new THREE.Vector3(0, -1.0, 1.5)
                targetPos.lerpVectors(phase2End, worldPos, eased)
                targetScale = 1.1 - (1.1 * eased)
            } else {
                targetPos.set(0, -1.5, 2)
            }
        }

        groupRef.current.position.copy(targetPos)
        groupRef.current.scale.setScalar(targetScale)

        if (bRef.current && dRef.current) {
            const orbitAngle = progress * Math.PI * 6 + time * 0.2
            const baseRadius = 0.15
            const maxRadius = 1.2
            const orbitRadius = baseRadius + (maxRadius - baseRadius) * progress
            const zWave = Math.sin(orbitAngle * 2) * 0.3

            bRef.current.position.x = Math.cos(orbitAngle) * orbitRadius
            bRef.current.position.y = Math.sin(orbitAngle) * orbitRadius + 0.3
            bRef.current.position.z = zWave

            dRef.current.position.x = Math.cos(orbitAngle + Math.PI) * orbitRadius
            dRef.current.position.y = Math.sin(orbitAngle + Math.PI) * orbitRadius - 0.3
            dRef.current.position.z = -zWave

            const breathe = 1 + Math.sin(time * 1.5) * 0.02
            bRef.current.scale.setScalar(breathe)
            dRef.current.scale.setScalar(breathe)
        }
    })

    return (
        <group ref={groupRef} position={[3.5, 2, 0]}>
            <group ref={bRef}>
                <mesh>
                    <shapeGeometry args={[bShape]} />
                    <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
                </mesh>
            </group>
            <group ref={dRef}>
                <mesh>
                    <shapeGeometry args={[dShape]} />
                    <meshBasicMaterial color="#111111" side={THREE.DoubleSide} />
                </mesh>
            </group>
        </group>
    )
}

*/
