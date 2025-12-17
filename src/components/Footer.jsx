import { Palette, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './Footer.css';



/**
 * Composant Footer avec informations de contact et liens
 */
function Footer() {
    const currentYear = new Date().getFullYear();
    const { t } = useLanguage();

    return (
        <footer id="contact" className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-title">
                            <Palette className="footer-logo-icon" size={28} />
                            EA Tech
                        </h3>
                        <p className="footer-description">
                            {t('footer.description')}
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">{t('footer.services')}</h4>
                        <ul className="footer-links">
                            <li><a href="#services">Design Graphique</a></li>
                            <li><a href="#services">Animations JS</a></li>
                            <li><a href="#services">Icônes</a></li>
                            <li><a href="#services">UI/UX Design</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">{t('footer.contact')}</h4>
                        <ul className="footer-contact">
                            <li>
                                <Mail size={18} />
                                <span>contact@eatech.com</span>
                            </li>
                            <li>
                                <Phone size={18} />
                                <span>+33 1 23 45 67 89</span>
                            </li>
                            <li>
                                <MapPin size={18} />
                                <span>123 Rue de la Créativité, 75001 Paris</span>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">{t('footer.follow')}</h4>
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
                    <p>&copy; {currentYear} EA Tech. {t('footer.rights')}</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

