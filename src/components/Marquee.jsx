import { motion } from 'framer-motion'
import './Marquee.css'

export default function Marquee() {
    const text = 'From ordinary to extraordinary  ✦  '
    const repeated = text.repeat(6)

    return (
        <section className="marquee-section">
            <motion.div
                className="marquee__track"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="marquee__content">
                    <span>{repeated}</span>
                    <span aria-hidden="true">{repeated}</span>
                </div>
            </motion.div>

            <div className="marquee__badge container">
                <span className="marquee__badge-text">Brianna Dawes Studios<sup>®</sup></span>
            </div>
        </section>
    )
}
