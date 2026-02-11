import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import './FooterCanvas.css'

/* ============================================
   PREMIUM GEOMETRIC SCENE
   A sophisticated, breathing geometric core
   representing structure, creativity, and flow.
   ============================================ */

function GeometricCore() {
    return (
        <group>
            {/* Main morphing core */}
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <Icosahedron args={[1.8, 0]}>
                    <MeshDistortMaterial
                        color="#F9452D"
                        wireframe
                        transparent
                        opacity={0.15}
                        distort={0.4}
                        speed={1.5}
                        roughness={0}
                    />
                </Icosahedron>
            </Float>

            {/* Inner solid core for depth */}
            <Float speed={2} rotationIntensity={1} floatIntensity={0.2}>
                <Icosahedron args={[1.2, 0]}>
                    <meshBasicMaterial
                        color="#F9452D"
                        wireframe
                        transparent
                        opacity={0.3}
                    />
                </Icosahedron>
            </Float>

            {/* Outer large ring */}
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2} rotation={[Math.PI / 2, 0, 0]}>
                <mesh>
                    <torusGeometry args={[3.5, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#555" transparent opacity={0.2} />
                </mesh>
            </Float>

            {/* Tilted orbital ring */}
            <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.3} rotation={[0.4, 0.2, 0]}>
                <mesh>
                    <torusGeometry args={[4.2, 0.01, 16, 100]} />
                    <meshBasicMaterial color="#F9452D" transparent opacity={0.3} />
                </mesh>
            </Float>
        </group>
    )
}

function Scene() {
    return (
        <>
            <fog attach="fog" args={['#0a0a0a', 5, 20]} />

            {/* Ambient Particles */}
            <Sparkles
                count={80}
                scale={12}
                size={2}
                speed={0.4}
                opacity={0.5}
                color="#ffffff"
            />

            {/* Main Object placed in the Left Corner */}
            <group position={[-5, -1, 0]}>
                <GeometricCore />
            </group>
        </>
    )
}

export default function FooterCanvas() {
    return (
        <div className="footer-canvas">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true, // Allow transparency to blend with CSS background
                }}
            >
                <Scene />
            </Canvas>
        </div>
    )
}
