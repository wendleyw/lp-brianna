import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks'
import './CTASection.css'

export default function CTASection() {
    const [ref, isInView] = useInView()

    return (
        <section className="cta-section section" ref={ref}>
            <div className="cta-section__bg">
                <div className="cta-section__orb cta-section__orb--1" />
                <div className="cta-section__orb cta-section__orb--2" />
            </div>

            <motion.div
                className="cta-section__content container"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                <motion.div className="cta-section__icon" variants={fadeInUp}>
                    <Zap size={32} />
                </motion.div>

                <motion.h2 className="cta-section__title" variants={fadeInUp}>
                    Ready for Real Results?
                </motion.h2>

                <motion.p className="cta-section__text" variants={fadeInUp}>
                    Stop losing customers with a website that doesn't convert. Book a free
                    strategy session and discover exactly how to multiply your results.
                </motion.p>

                <motion.a
                    href="https://calendly.com/briannadawesstudio/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-primary--lg"
                    variants={fadeInUp}
                >
                    Let's Talk
                    <ArrowRight size={20} />
                </motion.a>

                <motion.p className="cta-section__disclaimer" variants={fadeInUp}>
                    ✓ 100% free &nbsp;&nbsp; ✓ No commitment &nbsp;&nbsp; ✓ Personalized diagnosis
                </motion.p>
            </motion.div>
        </section>
    )
}
