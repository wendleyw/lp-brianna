import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './ParallaxShowcase.css'

const cards = [
    {
        id: 1,
        title: "Intelligent Insights",
        desc: "AI that understands your brand's unique voice and goals."
    },
    {
        id: 2,
        title: "Instant Creation",
        desc: "Generate production-ready assets in seconds, not hours."
    },
    {
        id: 3,
        title: "Seamless Integration",
        desc: "Works perfectly with your existing design workflow."
    }
]

export default function ParallaxShowcase() {
    const containerRef = useRef(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 900)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // DESKTOP ANIMATIONS (Hooks must be called unconditionally)
    const headerOpacity = useTransform(scrollYProgress, [0.15, 0.20, 0.30, 0.40], [0, 1, 1, 0])
    const headerX = useTransform(scrollYProgress, [0.15, 0.20, 0.35, 0.45], [50, 0, 0, -100])
    const headerBlur = useTransform(scrollYProgress, [0.30, 0.40], ["blur(0px)", "blur(10px)"])

    return (
        <section className="parallax-showcase" ref={containerRef}>
            <div className="parallax-showcase__sticky">
                <div className="parallax-showcase__content container">

                    {/* Header */}
                    <motion.div
                        className="parallax-showcase__header"
                        style={isMobile ? {} : {
                            opacity: headerOpacity,
                            x: headerX,
                            filter: headerBlur
                        }}
                    >
                        <h2 className="parallax-showcase__title">
                            More than just <br />
                            <span className="text-gradient">Design</span>
                        </h2>
                        <p className="parallax-showcase__subtitle">
                            We bring intelligence to every pixel.
                        </p>
                    </motion.div>

                    {/* Cards Container */}
                    <div className="parallax-showcase__cards">
                        {cards.map((card, index) => {
                            // Desktop Animations Only
                            // Hooks inside map is generally safe if array is constant, which it is here.
                            const delay = index * 0.05
                            const start = 0.25 + delay
                            const end = 0.45 + delay
                            const startY = 400 + (index * 80)
                            const targetY = (index - 1) * 220

                            const cardY = useTransform(scrollYProgress, [start, end], [startY, targetY])
                            const cardOpacity = useTransform(scrollYProgress, [start, start + 0.08, 0.75, 0.85], [0, 1, 1, 0])
                            const cardScale = useTransform(scrollYProgress, [start, end], [0.85, 1])

                            const desktopStyle = {
                                y: cardY,
                                opacity: cardOpacity,
                                scale: cardScale,
                                zIndex: cards.length - index,
                                position: 'absolute',
                                width: '320px'
                            }

                            return (
                                <motion.div
                                    key={card.id}
                                    className="parallax-card"
                                    style={isMobile ? {
                                        // Mobile Static Styles (relies on CSS mostly)
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        position: 'relative', // Override absolute from desktop logic if leaked
                                        zIndex: 1
                                    } : desktopStyle}
                                    initial={isMobile ? { opacity: 0, y: 20 } : {}}
                                    whileInView={isMobile ? { opacity: 1, y: 0 } : {}}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <h3 className="parallax-card__title">{card.title}</h3>
                                    <p className="parallax-card__desc">{card.desc}</p>
                                </motion.div>
                            )
                        })}
                    </div>

                </div>
                <div className="parallax-showcase__bg-gradient" />
            </div>
        </section>
    )
}
