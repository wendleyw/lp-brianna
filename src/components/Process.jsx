import { motion } from 'framer-motion'
import { useInView, staggerContainer, fadeInUp } from '../hooks'
import './Process.css'

const steps = [
    {
        number: '01',
        title: 'Discovery & Strategy',
        desc: 'We dive deep into your business goals, target audience, and competitive landscape to build a strategy that drives results.',
    },
    {
        number: '02',
        title: 'Design & Prototyping',
        desc: 'We create high-fidelity mockups and interactive prototypes, iterating closely with you until every detail is pixel-perfect.',
    },
    {
        number: '03',
        title: 'Development & Integration',
        desc: 'We build your project using the latest technologies, ensuring performance, SEO optimization, and seamless third-party integrations.',
    },
    {
        number: '04',
        title: 'Launch & Support',
        desc: 'We launch your project with thorough QA testing and provide ongoing support to keep everything running at peak performance.',
    },
]

export default function Process() {
    const [ref, isInView] = useInView()

    return (
        <section className="process section" id="process" ref={ref}>
            <div className="container">
                <motion.div
                    className="process__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">How We Work</span>
                    <h2 className="section-title">Our Process</h2>
                </motion.div>

                <motion.div
                    className="process__grid"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {steps.map((step, i) => (
                        <motion.div key={i} className="process__step" variants={fadeInUp}>
                            <span className="process__number">{step.number}</span>
                            <div className="process__content">
                                <h3 className="process__step-title">{step.title}</h3>
                                <p className="process__step-desc">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
