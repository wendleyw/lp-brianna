import { motion } from 'framer-motion'
import { useInView, staggerContainer, fadeInUp } from '../hooks'
import { Star, ArrowUpRight } from 'lucide-react'
import './Results.css'

const successStories = [
    {
        name: 'TechFlow SaaS',
        quote: 'Brianna and her team completely transformed our digital presence. Within 3 months, our conversion rate increased by 61% and our average ticket increased by 45%.',
        metric: '+61% conversion',
        person: 'Rafael C., CEO',
    },
    {
        name: 'Verde & Co.',
        quote: 'Absolute professionalism. The redesign of our e-commerce wasn\'t just beautiful — it converted. Customer retention rose 28% in the first quarter.',
        metric: '+28% retention',
        person: 'Ana S., Marketing Director',
    },
    {
        name: 'NovaMed',
        quote: 'We went from zero to $2M in revenue in under 8 months. The website and landing pages they built are scheduling machines.',
        metric: '0 → $2M revenue',
        person: 'Dr. Marcus O., Founder',
    },
]

export default function Results() {
    const [ref, isInView] = useInView()

    return (
        <section className="results section" id="results" ref={ref}>
            <div className="container">
                <motion.div
                    className="results__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Success Stories</span>
                    <h2 className="results__title">
                        Success<br />stories
                    </h2>
                </motion.div>

                <motion.div
                    className="results__grid"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {successStories.map((story, i) => (
                        <motion.div key={i} className="results__card card" variants={fadeInUp}>
                            <div className="results__stars">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <Star key={j} size={14} fill="#F9452D" color="#F9452D" />
                                ))}
                            </div>
                            <p className="results__quote">"{story.quote}"</p>
                            <div className="results__footer">
                                <div>
                                    <strong className="results__person">{story.person}</strong>
                                    <span className="results__company">{story.name}</span>
                                </div>
                                <span className="results__metric">{story.metric}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
