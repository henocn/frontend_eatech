import { useState, useEffect } from 'react';
import { Palette, Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import './Header.css';



/**
 * Composant Header avec navigation et animation au scroll
 */
function Header({ current }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

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
                    <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                        Accueil
                    </Link>
                    <a href="#services" className={`nav-link ${current === 'services' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                        Services
                    </a>
                    <a href="#contact" className={`nav-link ${current === 'contact' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                        Contact
                    </a>
                    <a href="#about" className={`nav-link ${current === 'about' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                        À propos
                    </a>
                    <Link to="/account" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                        Compte
                    </Link>
                </nav>

                <div className="header-actions">
                    
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

