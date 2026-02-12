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

    return (
        <section className="parallax-showcase" ref={containerRef}>
            <div className="parallax-showcase__sticky">
                <div className="parallax-showcase__content container">

                    <motion.div
                        className="parallax-showcase__header"
                        style={{
                            // Title fades in when section enters, then fades out for cards
                            opacity: useTransform(scrollYProgress, [0.15, 0.20, 0.30, 0.40], [0, 1, 1, 0]),
                            // Disable horizontal movement on mobile
                            x: useTransform(scrollYProgress, [0.15, 0.20, 0.35, 0.45], isMobile ? [0, 0, 0, 0] : [50, 0, 0, -100]),
                            filter: useTransform(scrollYProgress, [0.30, 0.40], ["blur(0px)", "blur(10px)"])
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

                    <motion.div
                        className="parallax-showcase__cards"
                        style={{
                            scale: useTransform(scrollYProgress, [0.25, 0.55], [0.95, 1.0]),
                            // Disable horizontal slide-in on mobile
                            x: useTransform(scrollYProgress, [0.20, 0.30], isMobile ? [0, 0] : [100, 0]),
                            opacity: useTransform(scrollYProgress, [0.20, 0.30], [0, 1])
                        }}
                    >
                        {cards.map((card, index) => {
                            // STAGGERED ENTRY - Cards appear after section is visible
                            // Card 0: 0.25 - 0.45
                            // Card 1: 0.30 - 0.50
                            // Card 2: 0.35 - 0.55

                            const delay = index * 0.05
                            const start = 0.25 + delay
                            const end = 0.45 + delay

                            // VERTICAL STACK
                            // Desktop: -220px (top), 0px (center), 220px (bottom)
                            // Mobile: Stack them tighter or distributed differently
                            // With 3 cards, typical mobile stack: -150, 0, 150
                            const desktopTargetY = (index - 1) * 220
                            const mobileTargetY = (index - 1) * 160
                            const targetY = isMobile ? mobileTargetY : desktopTargetY

                            // Start position: all cards come from below
                            // Mobile: reduce start distance to reduce speed/motion sickness
                            const startY = isMobile ? 200 : (400 + (index * 80))

                            const y = useTransform(scrollYProgress, [start, end], [startY, targetY])
                            const opacity = useTransform(scrollYProgress, [start, start + 0.08, 0.75, 0.85], [0, 1, 1, 0])

                            // Reduce scale effect on mobile
                            const scale = useTransform(scrollYProgress, [start, end], isMobile ? [0.95, 1] : [0.85, 1])

                            return (
                                <motion.div
                                    key={card.id}
                                    className="parallax-card"
                                    style={{
                                        y,
                                        opacity,
                                        scale,
                                        zIndex: cards.length - index,
                                        // On mobile, ensure they are centered and not too wide
                                        width: isMobile ? '85vw' : '320px',
                                        maxWidth: '320px'
                                    }}
                                >
                                    <h3 className="parallax-card__title">{card.title}</h3>
                                    <p className="parallax-card__desc">{card.desc}</p>
                                </motion.div>
                            )
                        })}
                    </motion.div>

                </div>
                <div className="parallax-showcase__bg-gradient" />
            </div>
        </section>
    )
}
