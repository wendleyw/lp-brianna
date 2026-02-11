import { motion } from 'framer-motion'
import { useInView, staggerContainer, fadeInUp } from '../hooks'
import './Services.css'

const serviceCards = [
    {
        title: 'Your Objectives, Our Focus',
        items: [
            { name: 'Priority Care', desc: 'Dedicated attention for your project from start to finish.' },
            { name: 'Tailored tweaks for perfection', desc: 'Fine-tuning every detail to match your vision.' },
            { name: 'Brand kit at your fingertips', desc: 'Complete brand assets ready for instant use across all channels.' },
        ],
    },
]

const servicesList = [
    { name: 'Branding', tag: '01' },
    { name: 'Development', tag: '02' },
    { name: 'Website', tag: '03' },
    { name: 'Design Support', tag: '04' },
]

export default function Services() {
    const [ref, isInView] = useInView()

    return (
        <section className="services section" id="services" ref={ref}>
            {/* Objectives cards */}
            <div className="container">
                <motion.div
                    className="services__objectives"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <motion.h2 className="services__title" variants={fadeInUp}>
                        Your Objectives,
                        <br />
                        Our Focus
                    </motion.h2>

                    <motion.div className="services__cards" variants={fadeInUp}>
                        {serviceCards[0].items.map((item, i) => (
                            <div key={i} className="services__card card">
                                <h3 className="services__card-name">{item.name}</h3>
                                <p className="services__card-desc">{item.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Big services list */}
            <div className="services__list-section section--dark">
                <div className="container">
                    <motion.div
                        className="services__big-list"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {servicesList.map((s, i) => (
                            <motion.div key={i} className="services__big-item" variants={fadeInUp}>
                                <span className="services__big-tag">{s.tag}</span>
                                <span className="services__big-name">{s.name}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
