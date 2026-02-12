import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ImageSequence({ images }) {
    const containerRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    // Preload images
    useEffect(() => {
        images.forEach((src) => {
            const img = new Image()
            img.src = src
        })
    }, [images])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    // Map scroll progress (0 to 1) to image index (0 to images.length - 1)
    const index = useTransform(scrollYProgress, [0, 1], [0, images.length - 1])

    useEffect(() => {
        const unsubscribe = index.on('change', (latest) => {
            setCurrentIndex(Math.round(latest))
        })
        return () => unsubscribe()
    }, [index])

    return (
        <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
            <div
                style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >
                {/* Render current image */}
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {images.map((src, i) => (
                        <img
                            key={src}
                            src={src}
                            alt={`Sequence ${i + 1}`}
                            style={{
                                display: i === currentIndex ? 'block' : 'none',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                // Smooth transition if desired, but for sequence snap is usually better
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
