import { useState, useEffect } from 'react';
import './Header.css';



/**
 * Composant Header avec navigation et animation au scroll
 */
function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <div className="logo">
                    <span className="logo-icon">🎨</span>
                    <span className="logo-text">EA Tech</span>
                </div>

                <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <a href="#home" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                        Accueil
                    </a>
                    <a href="#services" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                        Services
                    </a>
                    <a href="#about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                        À propos
                    </a>
                    <a href="#contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                        Contact
                    </a>
                </nav>

                <button className="menu-toggle" onClick={toggleMobileMenu}>
                    <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
            </div>
        </header>
    );
}

export default Header;

