import { Palette, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
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
                            <img src="/images/logo2.png" alt="EA Tech" className="footer-logo-img" />
                        </h3>
                        <p className="footer-description">
                            Des solutions créatives et innovantes pour transformer vos idées en réalité.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Services</h4>
                        <ul className="footer-links">
                            <li><a href="#services">Design Graphique</a></li>
                            <li><a href="#services">Publicité sociales</a></li>
                            <li><a href="#services">Tournage video</a></li>
                            <li><a href="#services">UI/UX Design</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Contact</h4>
                        <ul className="footer-contact">
                            <li>
                                <Mail size={18} />
                                <span>goldenstudio-eatech@gmail.com</span>
                            </li>
                            <li>
                                <Phone size={18} />
                                <span>+228 70276414</span>
                            </li>
                            <li>
                                <MapPin size={18} />
                                <span>Agoè 2 Lions, Près de l'école MARIAM, Lomé - Togo</span>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Suivez-nous</h4>
                        <div className="footer-social">
                            <a href="#" className="social-link" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="social-link" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="social-link" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Golden Studio. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

