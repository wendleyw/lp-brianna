import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import * as THREE from 'three'
import { useState, useEffect } from 'react'
import './ScrollStoryCanvas.css'

/* ========================================
   SCROLL-DRIVEN 3D STORYTELLING CANVAS
   
   A fixed Three.js background that creates
   a visual narrative as the user scrolls:
   
   0-15%   HERO:        Scattered particles converge → sphere
   15-30%  PROOF:       Sphere expands, particles orbit fast
   30-50%  SERVICES:    Sphere → torus ring transformation
   50-65%  PROCESS:     Ring splits into 4 orbital nodes
   65-80%  RESULTS:     Nodes pulse and connect with light
   80-90%  CTA:         Everything converges to bright center
   90-100% FOOTER:      Particles settle gently downward
   ======================================== */

// Hook to read Framer Motion scroll value into R3F
function useScrollProgress() {
    const { scrollYProgress } = useScroll()
    const [progress, setProgress] = useState(0)

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        setProgress(v)
    })

    return progress
}

/* ---- Storytelling Particles ---- */
function StoryParticles({ count = 300 }) {
    const meshRef = useRef()
    const progressRef = useRef(0)
    const progress = useScrollProgress()

    useEffect(() => {
        progressRef.current = progress
    }, [progress])

    // Generate initial random positions and target positions for each "scene"
    const { positions, randomOffsets, colors } = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const offsets = new Float32Array(count * 3)
        const cols = new Float32Array(count * 3)

        const accentColor = new THREE.Color('#F9452D')
        const warmColor = new THREE.Color('#FF8C42')
        const whiteColor = new THREE.Color('#ffffff')

        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            // Start scattered
            pos[i3] = (Math.random() - 0.5) * 20
            pos[i3 + 1] = (Math.random() - 0.5) * 20
            pos[i3 + 2] = (Math.random() - 0.5) * 10

            // Random offsets for organic movement
            offsets[i3] = Math.random() * Math.PI * 2
            offsets[i3 + 1] = Math.random() * Math.PI * 2
            offsets[i3 + 2] = Math.random() * 0.5 + 0.5

            // Colors — mix of accent, warm, white
            const t = Math.random()
            const color = t < 0.4 ? accentColor : t < 0.7 ? warmColor : whiteColor
            cols[i3] = color.r
            cols[i3 + 1] = color.g
            cols[i3 + 2] = color.b
        }

        return { positions: pos, randomOffsets: offsets, colors: cols }
    }, [count])

    // Sphere target positions
    const sphereTargets = useMemo(() => {
        const targets = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            const phi = Math.acos(2 * Math.random() - 1)
            const theta = Math.random() * Math.PI * 2
            const r = 2.5
            targets[i3] = r * Math.sin(phi) * Math.cos(theta)
            targets[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            targets[i3 + 2] = r * Math.cos(phi)
        }
        return targets
    }, [count])

    // Torus target positions
    const torusTargets = useMemo(() => {
        const targets = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            const theta = Math.random() * Math.PI * 2
            const phi = Math.random() * Math.PI * 2
            const R = 3.5
            const r = 0.8
            targets[i3] = (R + r * Math.cos(phi)) * Math.cos(theta)
            targets[i3 + 1] = r * Math.sin(phi)
            targets[i3 + 2] = (R + r * Math.cos(phi)) * Math.sin(theta)
        }
        return targets
    }, [count])

    // Helix/DNA target positions
    const helixTargets = useMemo(() => {
        const targets = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            const t = (i / count) * Math.PI * 6
            const strand = i % 2 === 0 ? 1 : -1
            targets[i3] = Math.cos(t) * 2 * strand
            targets[i3 + 1] = (i / count - 0.5) * 8
            targets[i3 + 2] = Math.sin(t) * 2 * strand
        }
        return targets
    }, [count])

    useFrame((state) => {
        if (!meshRef.current) return
        const geo = meshRef.current.geometry
        const posAttr = geo.attributes.position
        const time = state.clock.elapsedTime
        const p = progressRef.current

        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            const ox = randomOffsets[i3]
            const oy = randomOffsets[i3 + 1]
            const speed = randomOffsets[i3 + 2]

            let tx, ty, tz

            if (p < 0.15) {
                // HERO: scattered → sphere convergence
                const t = Math.min(p / 0.15, 1)
                const ease = t * t * (3 - 2 * t) // smoothstep
                tx = THREE.MathUtils.lerp(positions[i3], sphereTargets[i3], ease)
                ty = THREE.MathUtils.lerp(positions[i3 + 1], sphereTargets[i3 + 1], ease)
                tz = THREE.MathUtils.lerp(positions[i3 + 2], sphereTargets[i3 + 2], ease)
            } else if (p < 0.30) {
                // SOCIAL PROOF: sphere orbiting fast
                const angle = time * 0.5 * speed + ox
                const r = 2.5 + Math.sin(time * 0.3 + oy) * 0.5
                tx = sphereTargets[i3] * Math.cos(angle * 0.3) - sphereTargets[i3 + 2] * Math.sin(angle * 0.3)
                ty = sphereTargets[i3 + 1] + Math.sin(time * 0.5 + ox) * 0.3
                tz = sphereTargets[i3] * Math.sin(angle * 0.3) + sphereTargets[i3 + 2] * Math.cos(angle * 0.3)
            } else if (p < 0.50) {
                // SERVICES: sphere → torus transformation
                const t = Math.min((p - 0.30) / 0.20, 1)
                const ease = t * t * (3 - 2 * t)
                tx = THREE.MathUtils.lerp(sphereTargets[i3], torusTargets[i3], ease)
                ty = THREE.MathUtils.lerp(sphereTargets[i3 + 1], torusTargets[i3 + 1], ease)
                tz = THREE.MathUtils.lerp(sphereTargets[i3 + 2], torusTargets[i3 + 2], ease)
                // Add rotation
                const angle = time * 0.2
                const rx = tx * Math.cos(angle) - tz * Math.sin(angle)
                const rz = tx * Math.sin(angle) + tz * Math.cos(angle)
                tx = rx
                tz = rz
            } else if (p < 0.65) {
                // PROCESS: torus → helix (DNA structure = process steps)
                const t = Math.min((p - 0.50) / 0.15, 1)
                const ease = t * t * (3 - 2 * t)
                tx = THREE.MathUtils.lerp(torusTargets[i3], helixTargets[i3], ease)
                ty = THREE.MathUtils.lerp(torusTargets[i3 + 1], helixTargets[i3 + 1], ease)
                tz = THREE.MathUtils.lerp(torusTargets[i3 + 2], helixTargets[i3 + 2], ease)
            } else if (p < 0.80) {
                // RESULTS: helix pulsing with energy
                const pulse = 1 + Math.sin(time * 2 + i * 0.1) * 0.15
                tx = helixTargets[i3] * pulse
                ty = helixTargets[i3 + 1] + Math.sin(time * 0.8 + ox) * 0.3
                tz = helixTargets[i3 + 2] * pulse
                // Rotate the whole helix
                const angle = time * 0.3
                const rx = tx * Math.cos(angle) - tz * Math.sin(angle)
                const rz = tx * Math.sin(angle) + tz * Math.cos(angle)
                tx = rx
                tz = rz
            } else if (p < 0.90) {
                // CTA: converge to bright center point
                const t = Math.min((p - 0.80) / 0.10, 1)
                const ease = t * t * t // cubic ease
                tx = THREE.MathUtils.lerp(helixTargets[i3], 0, ease) + Math.sin(time * 2 + ox) * (1 - ease) * 0.3
                ty = THREE.MathUtils.lerp(helixTargets[i3 + 1], 0, ease) + Math.cos(time * 2 + oy) * (1 - ease) * 0.3
                tz = THREE.MathUtils.lerp(helixTargets[i3 + 2], 0, ease)
            } else {
                // FOOTER: gentle rain / settle downward
                const t = Math.min((p - 0.90) / 0.10, 1)
                tx = Math.sin(time * 0.2 + ox) * 3 * (1 - t * 0.5)
                ty = -t * 5 + Math.sin(time * 0.3 + oy) * 0.5
                tz = Math.cos(time * 0.2 + oy) * 2
            }

            // Add micro floating animation
            tx += Math.sin(time * 0.5 + ox) * 0.05
            ty += Math.cos(time * 0.4 + oy) * 0.05

            // Smooth interpolation to target
            const curr_x = posAttr.getX(i)
            const curr_y = posAttr.getY(i)
            const curr_z = posAttr.getZ(i)
            posAttr.setXYZ(
                i,
                THREE.MathUtils.lerp(curr_x, tx, 0.04),
                THREE.MathUtils.lerp(curr_y, ty, 0.04),
                THREE.MathUtils.lerp(curr_z, tz, 0.04)
            )
        }

        posAttr.needsUpdate = true

        // Rotate entire system slowly
        meshRef.current.rotation.y += 0.001
    })

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={count}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    array={colors}
                    count={count}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

/* ---- Connecting Lines / Energy Beams ---- */
function EnergyLines() {
    const linesRef = useRef()
    const progressRef = useRef(0)
    const progress = useScrollProgress()

    useEffect(() => {
        progressRef.current = progress
    }, [progress])

    const linePositions = useMemo(() => {
        const count = 60
        const pos = new Float32Array(count * 6) // pairs of points
        for (let i = 0; i < count; i++) {
            const i6 = i * 6
            const theta = (i / count) * Math.PI * 2
            const r = 3
            pos[i6] = 0
            pos[i6 + 1] = 0
            pos[i6 + 2] = 0
            pos[i6 + 3] = Math.cos(theta) * r
            pos[i6 + 4] = Math.sin(theta) * r * 0.5
            pos[i6 + 5] = Math.sin(theta) * r
        }
        return pos
    }, [])

    useFrame((state) => {
        if (!linesRef.current) return
        const p = progressRef.current
        const time = state.clock.elapsedTime

        // Lines only visible during CTA convergence (0.80 - 0.92)
        const lineOpacity = p > 0.78 && p < 0.92
            ? Math.sin(((p - 0.78) / 0.14) * Math.PI) * 0.4
            : 0

        linesRef.current.material.opacity = lineOpacity

        // Animate line endpoints
        const pos = linesRef.current.geometry.attributes.position
        const count = 60
        for (let i = 0; i < count; i++) {
            const i6 = i * 6
            const theta = (i / count) * Math.PI * 2 + time * 0.3
            const r = 3 + Math.sin(time + i) * 0.5
            pos.array[i6 + 3] = Math.cos(theta) * r
            pos.array[i6 + 4] = Math.sin(time * 0.5 + i * 0.5) * r * 0.3
            pos.array[i6 + 5] = Math.sin(theta) * r
        }
        pos.needsUpdate = true
    })

    return (
        <lineSegments ref={linesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={linePositions}
                    count={120}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial
                color="#F9452D"
                transparent
                opacity={0}
                blending={THREE.AdditiveBlending}
            />
        </lineSegments>
    )
}

/* ---- Central Glowing Orb ---- */
function CenterOrb() {
    const orbRef = useRef()
    const glowRef = useRef()
    const progressRef = useRef(0)
    const progress = useScrollProgress()

    useEffect(() => {
        progressRef.current = progress
    }, [progress])

    useFrame((state) => {
        if (!orbRef.current) return
        const p = progressRef.current
        const time = state.clock.elapsedTime

        // Orb grows during CTA section
        let scale = 0.1
        let opacity = 0.2

        if (p > 0.78 && p < 0.95) {
            const t = (p - 0.78) / 0.12
            scale = 0.1 + t * 1.5
            opacity = 0.2 + t * 0.6
        } else if (p >= 0.95) {
            scale = 1.6 - (p - 0.95) * 10
            opacity = 0.8 - (p - 0.95) * 5
        }

        orbRef.current.scale.setScalar(Math.max(scale, 0.1))
        orbRef.current.material.opacity = Math.max(opacity, 0.1)

        // Pulse
        const pulse = 1 + Math.sin(time * 2) * 0.05
        orbRef.current.scale.multiplyScalar(pulse)

        // Glow ring
        if (glowRef.current) {
            glowRef.current.scale.setScalar(Math.max(scale * 2, 0.1))
            glowRef.current.material.opacity = Math.max(opacity * 0.3, 0.02)
            glowRef.current.rotation.z = time * 0.2
        }
    })

    return (
        <group>
            <mesh ref={orbRef}>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshBasicMaterial
                    color="#F9452D"
                    transparent
                    opacity={0.2}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
            <mesh ref={glowRef}>
                <ringGeometry args={[0.4, 0.6, 64]} />
                <meshBasicMaterial
                    color="#FF8C42"
                    transparent
                    opacity={0.02}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    )
}

/* ---- Main Scene ---- */
function Scene() {
    return (
        <>
            <color attach="background" args={['#0a0a0a']} />
            <fog attach="fog" args={['#0a0a0a', 8, 20]} />
            <ambientLight intensity={0.15} />
            <StoryParticles count={350} />
            <EnergyLines />
            <CenterOrb />
        </>
    )
}

/* ---- Canvas Wrapper ---- */
export default function ScrollStoryCanvas() {
    return (
        <div className="scroll-story-canvas">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60, near: 0.1, far: 50 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance',
                }}
            >
                <Scene />
            </Canvas>
        </div>
    )
}
