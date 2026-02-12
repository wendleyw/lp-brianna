import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { staggerContainer, fadeInUp } from '../hooks'
import VideoModal from './VideoModal'
import './Hero.css'

const services = ['UX/UI Design', 'Development', 'Brand Identity Design', 'Ongoing Support']

export default function Hero() {
    const [isVideoOpen, setIsVideoOpen] = useState(false)

    return (
        <section className="hero" id="hero">
            <div className="hero__top container">
                <motion.div
                    className="hero__content"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p className="hero__eyebrow" variants={fadeInUp}>
                        Brianna Dawes Studios<sup>®</sup>
                    </motion.p>
                    <motion.p className="hero__sub-eyebrow" variants={fadeInUp}>
                        Digital design studio
                    </motion.p>

                    <motion.h1 className="hero__title" variants={fadeInUp}>
                        BRING YOUR
                        <br />
                        IDEAS TO LIFE
                    </motion.h1>
                </motion.div>

                <motion.div
                    className="hero__right"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="hero__services" variants={fadeInUp}>
                        <span className="hero__services-label">Digital</span>
                        <ul className="hero__services-list">
                            {services.map((s, i) => (
                                <li key={i}>{s}</li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.p className="hero__desc" variants={fadeInUp}>
                        We create digital designs that help brands move faster and convert
                        better. Your business deserves more than just a website. It needs results.
                    </motion.p>

                    <motion.div
                        className="hero__vsl-container"
                        variants={fadeInUp}
                        style={{ marginBottom: '32px' }}
                    >
                        <div className="hero__vsl-placeholder" onClick={() => setIsVideoOpen(true)}>
                            <div className="hero__vsl-play">
                                <Play size={20} fill="currentColor" />
                            </div>
                            <span className="hero__vsl-text">Watch Showreel</span>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <a
                            href="https://calendly.com/briannadawesstudio/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Let's talk
                            <ArrowRight size={16} />
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Hero image area */}
            <motion.div
                className="hero__image"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                <div className="hero__image-placeholder" style={{ background: 'none', border: 'none' }}>
                    <img
                        src="/b1.png"
                        alt="Design Studio"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius-lg)'
                        }}
                    />
                </div>
            </motion.div>
            <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
        </section>
    )
}
