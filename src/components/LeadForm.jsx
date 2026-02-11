import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, ArrowRight } from 'lucide-react'
import { useInView, staggerContainer, fadeInUp } from '../hooks'
import './LeadForm.css'

export default function LeadForm() {
    const [ref, isInView] = useInView()
    const [submitted, setSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: '',
        message: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <section className="lead-form section" id="lead-form" ref={ref}>
                <motion.div
                    className="lead-form__success container"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <CheckCircle size={64} className="lead-form__success-icon" />
                    <h3 className="lead-form__success-title">Session Booked Successfully!</h3>
                    <p className="lead-form__success-text">
                        We'll get in touch within 24 hours to confirm the time of your free
                        strategy session. Get ready to transform your results!
                    </p>
                </motion.div>
            </section>
        )
    }

    return (
        <section className="lead-form section" id="lead-form" ref={ref}>
            <div className="lead-form__bg">
                <div className="lead-form__orb" />
            </div>

            <div className="container">
                <motion.div
                    className="lead-form__wrapper"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <motion.div className="lead-form__info" variants={fadeInUp}>
                        <span className="section-label">Let's Talk</span>
                        <h2 className="section-title">Book Your Free Strategy Session</h2>
                        <p className="section-subtitle">
                            In 30 minutes, we'll analyze your business and create a personalized
                            action plan to multiply your digital results.
                        </p>

                        <div className="lead-form__benefits">
                            <div className="lead-form__benefit">
                                <div className="lead-form__benefit-check">✓</div>
                                <span>Complete diagnosis of your current website</span>
                            </div>
                            <div className="lead-form__benefit">
                                <div className="lead-form__benefit-check">✓</div>
                                <span>Identification of conversion opportunities</span>
                            </div>
                            <div className="lead-form__benefit">
                                <div className="lead-form__benefit-check">✓</div>
                                <span>Personalized action plan</span>
                            </div>
                            <div className="lead-form__benefit">
                                <div className="lead-form__benefit-check">✓</div>
                                <span>ROI projection for your business</span>
                            </div>
                        </div>
                    </motion.div>

                    <a href="https://calendly.com/briannadawesstudio/30min" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        Or book directly on Calendly →
                    </a>

                    <motion.form
                        className="lead-form__form glass-card"
                        variants={fadeInUp}
                        onSubmit={handleSubmit}
                    >
                        <div className="lead-form__field">
                            <label htmlFor="name">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="lead-form__field">
                            <label htmlFor="email">Business Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="you@company.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="lead-form__field">
                            <label htmlFor="website">Current Website</label>
                            <input
                                type="url"
                                id="website"
                                name="website"
                                placeholder="https://yoursite.com"
                                value={formData.website}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="lead-form__field">
                            <label htmlFor="message">Tell us about your project</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                placeholder="Briefly describe your goals and current challenges..."
                                value={formData.message}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="btn-primary lead-form__submit">
                            <Send size={18} />
                            Book Free Strategy Session
                            <ArrowRight size={18} />
                        </button>

                        <p className="lead-form__disclaimer">
                            🔒 Your data is safe. No spam, we promise.
                        </p>
                    </motion.form>
                </motion.div>
            </div>
        </section>
    )
}
