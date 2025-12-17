import './Footer.css';



/**
 * Composant Footer avec informations de contact et liens
 */
function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-title">
                            <span className="footer-logo-icon">🎨</span>
                            EA Tech
                        </h3>
                        <p className="footer-description">
                            Des solutions créatives et innovantes pour transformer vos idées en réalité.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Services</h4>
                        <ul className="footer-links">
                            <li><a href="#services">Design Graphique</a></li>
                            <li><a href="#services">Animations JS</a></li>
                            <li><a href="#services">Icônes</a></li>
                            <li><a href="#services">UI/UX Design</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Contact</h4>
                        <ul className="footer-contact">
                            <li>📧 contact@eatech.com</li>
                            <li>📱 +33 1 23 45 67 89</li>
                            <li>📍 123 Rue de la Créativité, 75001 Paris</li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Suivez-nous</h4>
                        <div className="footer-social">
                            <a href="#" className="social-link" aria-label="Facebook">📘</a>
                            <a href="#" className="social-link" aria-label="Twitter">🐦</a>
                            <a href="#" className="social-link" aria-label="Instagram">📷</a>
                            <a href="#" className="social-link" aria-label="LinkedIn">💼</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} EA Tech. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

