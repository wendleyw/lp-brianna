import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <a href="#" className="footer__logo">
                            <span className="footer__logo-bd">BD</span>
                            <span className="footer__logo-text">STUDIOS</span>
                            <span className="footer__logo-reg">®</span>
                        </a>
                        <p className="footer__tagline">
                            Digital design studio creating exceptional brand experiences.
                        </p>
                    </div>

                    <div className="footer__links">
                        <div className="footer__col">
                            <h4 className="footer__col-title">Studio</h4>
                            <a href="#services">Services</a>
                            <a href="#portfolio">Projects</a>
                            <a href="#process">Process</a>
                            <a href="#results">Results</a>
                        </div>
                        <div className="footer__col">
                            <h4 className="footer__col-title">Connect</h4>
                            <a href="https://calendly.com/briannadawesstudio/30min" target="_blank" rel="noopener noreferrer">Book a Call</a>
                            <a href="mailto:briannadawesstudio@gmail.com">Email</a>
                            <a href="https://www.instagram.com/briannadawesstudio/" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="https://www.behance.net/briannadawesstudios" target="_blank" rel="noopener noreferrer">Behance</a>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copy">&copy; {new Date().getFullYear()} Brianna Dawes Studios. All rights reserved.</p>
                    <div className="footer__legal">
                        <a href="https://www.briannadawesstudios.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                        <a href="https://www.briannadawesstudios.com/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
