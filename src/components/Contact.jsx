import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useInView, fadeInUp, staggerContainer } from '../hooks'

import ContactModal from './ContactModal'
import './Contact.css'

export default function Contact() {
    const [ref, isInView] = useInView()
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Scroll animation for button color
    const { scrollYProgress } = useScroll({
        target: { current: document.body }, // Global scroll
        offset: ["start end", "end end"]
    })

    // Adjust these range values based on where the "Contact" section is roughly
    // The "Let's bring your vision..." text is near the bottom.
    // We want it to turn orange when we are deep into the page.
    // Since we don't have exact offsets here easily without ref passing, 
    // we can use a local ref for the button wrapper or just the section ref.
    // Let's rely on the section ref being in view? No, that's boolean.
    // Let's use useScroll with the section ref.

    const { scrollYProgress: sectionProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    })

    const buttonBg = useTransform(sectionProgress, [0.3, 0.8], [0, 1]) // Fade in overlay image
    const buttonColor = useTransform(sectionProgress, [0.8, 1], ["#ffffff", "#F9452D"]) // Button bg logic separate
    const buttonTextColor = useTransform(sectionProgress, [0.8, 1], ["#0a0a0a", "#ffffff"]) // Dark to White text

    return (
        <section className="contact section section--dark" id="contact" ref={ref}>
            {/* Three.js animated background removed */}

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="contact__grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'end' }}>
                    <motion.div
                        className="contact__content"
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        style={{ paddingBottom: '120px' }}
                    >
                        <motion.h2 className="contact__title" variants={fadeInUp}>
                            Let's bring your
                            <br />
                            vision to life
                        </motion.h2>

                        <motion.p className="contact__desc" variants={fadeInUp}>
                            Ready to transform your digital presence? Book a free strategy session and
                            let's discuss how we can make your brand stand out.
                        </motion.p>

                        <motion.div className="contact__actions" variants={fadeInUp}>
                            <motion.button
                                id="contact-button"
                                onClick={() => setIsModalOpen(true)}
                                className="btn-primary btn-primary--white"
                                style={{
                                    backgroundColor: buttonColor,
                                    color: buttonTextColor,
                                    borderColor: 'transparent'
                                }}
                            >
                                Book a free call
                                <ArrowRight size={16} />
                            </motion.button>

                        </motion.div>
                    </motion.div>

                    <div className="contact__image-wrapper" style={{ position: 'relative', width: '100%', maxWidth: '500px', aspectRatio: '3/4' }}>
                        {/* Base Image */}
                        <motion.img
                            src="/bb2.png"
                            alt="Brianna Dawes"
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block', // Prevent inline gap
                                borderTopLeftRadius: '20px',
                                borderTopRightRadius: '20px',
                                borderBottomLeftRadius: '0',
                                borderBottomRightRadius: '0',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 15px rgba(249, 69, 45, 0.4))',
                                opacity: 1,
                                transform: 'translateY(1px)' // Ensure it touches the edge
                            }}
                        />
                    </div>
                </div>
            </div>

            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    )
}
