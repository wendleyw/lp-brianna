import { motion, AnimatePresence } from 'framer-motion'
import { X, Send } from 'lucide-react'
import './ContactModal.css'

export default function ContactModal({ isOpen, onClose }) {
    if (!isOpen) return null

    const inputVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.4 }
        })
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="contact-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="contact-modal"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="contact-modal__close" onClick={onClose}>
                            <X size={24} />
                        </button>

                        <h2 className="contact-modal__title">Let's Talk</h2>

                        <form className="contact-modal__form">
                            <motion.div
                                className="form-group"
                                custom={0}
                                initial="hidden"
                                animate="visible"
                                variants={inputVariants}
                            >
                                <label className="form-label">Name</label>
                                <input type="text" className="form-input" placeholder="Your name" />
                            </motion.div>

                            <motion.div
                                className="form-group"
                                custom={1}
                                initial="hidden"
                                animate="visible"
                                variants={inputVariants}
                            >
                                <label className="form-label">Email</label>
                                <input type="email" className="form-input" placeholder="your@email.com" />
                            </motion.div>

                            <motion.div
                                className="form-group"
                                custom={2}
                                initial="hidden"
                                animate="visible"
                                variants={inputVariants}
                            >
                                <label className="form-label">Objective</label>
                                <textarea className="form-textarea" placeholder="Tell us about your project or goal..."></textarea>
                            </motion.div>

                            <motion.button
                                className="btn-primary btn-primary--accent form-submit"
                                custom={3}
                                initial="hidden"
                                animate="visible"
                                variants={inputVariants}
                                type="submit"
                                onClick={(e) => { e.preventDefault(); /* Handle submit logic later */ }}
                            >
                                Send Message
                                <Send size={18} />
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
