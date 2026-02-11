import { motion } from 'framer-motion'
import { useInView, staggerContainer, fadeInUp } from '../hooks'
import { ArrowUpRight } from 'lucide-react'
import './Portfolio.css'

const projects = [
    {
        title: 'PROLON',
        category: 'Social Media Design  •  Email Marketing',
        desc: 'Created social media ad campaigns, designed email marketing strategies, and provided branding support.',
        color: '#e8e4df',
    },
    {
        title: 'TRUNK',
        category: 'Web Design  •  Development',
        desc: 'Complete website redesign and development with a focus on user experience and conversion optimization.',
        color: '#d4cfc8',
    },
    {
        title: 'SAGE Massage',
        category: 'Brand Identity  •  Web Design',
        desc: 'Full brand identity creation including logo, color palette, typography, and responsive website.',
        color: '#c9d4c5',
    },
    {
        title: 'One Dutch Hotel',
        category: 'Web Design  •  UX/UI',
        desc: 'Luxury hotel website with immersive visuals, booking integration, and premium user experience.',
        color: '#d4d0c8',
    },
]

export default function Portfolio() {
    const [ref, isInView] = useInView()

    return (
        <section className="portfolio section" id="portfolio" ref={ref}>
            <div className="container">
                <motion.div
                    className="portfolio__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="portfolio__title">
                        Proven results,
                        <br />
                        <em>stunning designs</em>
                    </h2>
                    <span className="section-label" style={{ marginBottom: 0 }}>Selected Work</span>
                </motion.div>

                <motion.div
                    className="portfolio__grid"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {projects.map((p, i) => (
                        <motion.div
                            key={i}
                            className="portfolio__item"
                            variants={fadeInUp}
                        >
                            <div className="portfolio__image" style={{ background: p.color }}>
                                <span className="portfolio__image-text">{p.title}</span>
                                <div className="portfolio__hover">
                                    <ArrowUpRight size={24} />
                                </div>
                            </div>
                            <div className="portfolio__info">
                                <h3 className="portfolio__name">{p.title}</h3>
                                <p className="portfolio__cat">{p.category}</p>
                                <p className="portfolio__desc">{p.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
