import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
            <div className="navbar__inner container">
                <a href="#" className="navbar__logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <video
                        src="/logo-animation.webm"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="navbar__logo-video"
                    />
                    <div className="navbar__logo-text-group">
                        <span className="navbar__logo-text">BD STUDIOS</span>
                        <span className="navbar__logo-reg">®</span>
                    </div>
                </a>

                <div className="navbar__right">
                    <a href="#portfolio" className="navbar__link">Projects</a>
                    <a id="navbar-cta" href="https://calendly.com/briannadawesstudio/30min" target="_blank" rel="noopener noreferrer" className="btn-primary navbar__cta">
                        Let's Talk
                        <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </motion.nav>
    )
}
