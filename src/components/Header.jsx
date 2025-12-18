import { useState, useEffect } from 'react';
import { Palette, Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import './Header.css';



/**
 * Composant Header avec navigation et animation au scroll
 */
function Header({ current }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { t, toggleLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /**
     * Bascule le menu mobile
     */
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <div className="logo">
                    <Palette className="logo-icon" size={28} />
                    <span className="logo-text">EA Tech</span>
                </div>

                <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <a href="#home" className={`nav-link ${current === 'home' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                        {t('nav.home')}
                    </a>
                    <a href="#services" className={`nav-link ${current === 'services' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                        {t('nav.services')}
                    </a>
                    <a href="#contact" className={`nav-link ${current === 'contact' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                        {t('nav.contact')}
                    </a>
                    <a href="#about" className={`nav-link ${current === 'about' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                        {t('nav.about')}
                    </a>
                    <Link to="/account" className={`nav-link ${current === 'account' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                        {t('nav.account')}
                    </Link>
                </nav>

                <div className="header-actions">
                    <button className="icon-button" onClick={toggleLanguage} aria-label="Toggle language">
                        <Globe size={20} />
                    </button>
                    <button className="icon-button" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <button className="menu-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;

