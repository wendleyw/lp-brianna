import { motion } from 'framer-motion'
import { useInView, useCountUp, staggerContainer, fadeInUp } from '../hooks'
import './SocialProof.css'

const counters = [
    { target: 17, suffix: '+', label: 'Websites launched', desc: 'Helping brands make their mark online.' },
    { target: 70, suffix: '%', label: 'Client satisfaction rate', desc: 'We build long-term partnerships through proven results.' },
    { target: 82, suffix: 'M', label: 'Investor Decks', desc: 'That were instrumental in raising funding for three start-ups.' },
    { target: 10, suffix: '+', label: 'Years of expertise', desc: 'Decades of experience in delivering impactful digital solutions.' },
]

function Counter({ target, suffix, label, desc, shouldStart }) {
    const count = useCountUp(target, 2200, shouldStart)

    return (
        <motion.div className="social-proof__item" variants={fadeInUp}>
            <span className="social-proof__number">{count}{suffix}</span>
            <span className="social-proof__label">{label}</span>
            <p className="social-proof__desc">{desc}</p>
        </motion.div>
    )
}

export default function SocialProof() {
    const [ref, isInView] = useInView({ threshold: 0.3 })

    return (
        <section className="social-proof section" ref={ref}>
            <div className="social-proof__header container">
                <motion.p
                    className="social-proof__intro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Our track record speaks volumes. Here's our proven impact in numbers.
                </motion.p>
            </div>
            <motion.div
                className="social-proof__grid container"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {counters.map((c, i) => (
                    <Counter key={i} {...c} shouldStart={isInView} />
                ))}
            </motion.div>
            <div className="container" style={{ textAlign: 'center', marginTop: '48px' }}>
                <a
                    href="https://calendly.com/briannadawesstudio/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                >
                    Let's talk
                </a>
            </div>
        </section>
    )
}
