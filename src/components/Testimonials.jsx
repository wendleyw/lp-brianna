import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useInView, fadeInUp } from '../hooks'
import './Testimonials.css'

const testimonials = [
    {
        name: 'Rafael Costa',
        role: 'CEO, TechFlow',
        text: 'Brianna and her team completely transformed our digital presence. Within 3 months, our conversion rate increased by 61% and our average ticket increased by 45%. The best investment we\'ve ever made.',
        metric: '+61% conversion',
        stars: 5,
    },
    {
        name: 'Ana Santos',
        role: 'Marketing Director, Verde & Co.',
        text: 'Absolute professionalism. The redesign of our e-commerce wasn\'t just beautiful — it converted. Our customer retention rose 28% in the first quarter.',
        metric: '+28% retention',
        stars: 5,
    },
    {
        name: 'Dr. Marcus Oliveira',
        role: 'Founder, NovaMed',
        text: 'We went from zero to $2M in revenue in under 8 months. The website and landing pages they built are scheduling machines. I recommend them to any serious business.',
        metric: '0→$2M revenue',
        stars: 5,
    },
    {
        name: 'Julia Almeida',
        role: 'Head of Product, StartupX',
        text: 'Their process is exceptional. Deep discovery, flawless design and execution that exceeded all expectations. Our app won 3 design awards after the redesign.',
        metric: '3 design awards',
        stars: 5,
    },
]

export default function Testimonials() {
    const [current, setCurrent] = useState(0)
    const [ref, isInView] = useInView()

    const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
    const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

    const t = testimonials[current]

    return (
        <section className="testimonials section" id="testimonials" ref={ref}>
            <div className="container">
                <motion.div
                    className="testimonials__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label">Testimonials</span>
                    <h2 className="section-title">What Our Clients Say</h2>
                </motion.div>

                <motion.div
                    className="testimonials__card glass-card"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="testimonials__quote-icon">
                        <Quote size={32} />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            className="testimonials__body"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.35 }}
                        >
                            <div className="testimonials__stars">
                                {Array.from({ length: t.stars }).map((_, i) => (
                                    <Star key={i} size={16} fill="var(--accent)" color="var(--accent)" />
                                ))}
                            </div>

                            <p className="testimonials__text">{t.text}</p>

                            <div className="testimonials__author">
                                <div className="testimonials__avatar">
                                    {t.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <strong className="testimonials__name">{t.name}</strong>
                                    <span className="testimonials__role">{t.role}</span>
                                </div>
                                <span className="testimonials__metric">{t.metric}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="testimonials__nav">
                        <button className="testimonials__nav-btn" onClick={prev} aria-label="Previous">
                            <ChevronLeft size={20} />
                        </button>
                        <div className="testimonials__dots">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                                    onClick={() => setCurrent(i)}
                                    aria-label={`Testimonial ${i + 1}`}
                                />
                            ))}
                        </div>
                        <button className="testimonials__nav-btn" onClick={next} aria-label="Next">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
