import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView, staggerContainer, fadeInUp } from '../hooks'
import { Plus, Minus } from 'lucide-react'
import './FAQ.css'

const faqs = [
    {
        q: 'What services does Brianna Dawes Studios offer?',
        a: 'We specialize in UX/UI design, brand identity design, web development, and ongoing design support. From concept to launch, we handle the entire creative process.',
    },
    {
        q: 'How long does a typical project take?',
        a: 'Most projects take between 4-8 weeks depending on scope and complexity. We\'ll provide a detailed timeline during our initial strategy session.',
    },
    {
        q: 'What is your design process like?',
        a: 'Our process follows four key phases: Discovery & Strategy, Design & Prototyping, Development & Integration, and Launch & Support. Each phase includes client checkpoints and feedback rounds.',
    },
    {
        q: 'Do you work with startups?',
        a: 'Absolutely! We\'ve helped multiple startups with investor decks that have raised over $82M in combined funding. We understand the unique needs of early-stage companies.',
    },
    {
        q: 'What makes you different from other agencies?',
        a: 'We combine strategic thinking with design excellence. Every decision is backed by data and aimed at driving real business results — not just aesthetic appeal.',
    },
    {
        q: 'How do I get started?',
        a: 'Book a free 30-minute strategy session through our Calendly link. We\'ll discuss your goals, timeline, and budget to determine the best path forward.',
    },
]

function FAQItem({ q, a, index }) {
    const [open, setOpen] = useState(false)

    return (
        <motion.div className={`faq__item ${open ? 'faq__item--open' : ''}`} variants={fadeInUp}>
            <button className="faq__question" onClick={() => setOpen(!open)}>
                <span className="faq__q-text">{q}</span>
                <span className="faq__icon">
                    {open ? <Minus size={18} /> : <Plus size={18} />}
                </span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="faq__answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <p>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function FAQ() {
    const [ref, isInView] = useInView()

    return (
        <section className="faq section" id="faq" ref={ref}>
            <div className="container">
                <motion.div
                    className="faq__layout"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <motion.div className="faq__left" variants={fadeInUp}>
                        <span className="section-label">Got Questions?</span>
                        <h2 className="section-title">FAQ</h2>
                        <p className="section-subtitle">
                            Everything you need to know about working with us.
                        </p>
                    </motion.div>

                    <div className="faq__list">
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} index={i} {...faq} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
