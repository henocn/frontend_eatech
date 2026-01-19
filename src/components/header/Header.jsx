import { useState, useEffect } from 'react';
import { Palette, Menu, X, Moon, Sun, Globe, User, LogOut, Home, ShoppingCart } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';



/**
 * Composant Header avec navigation et animation au scroll
 */
function Header({ current }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const { isAuthenticated, user, logout, cartItems } = useAuth();
    const navigate = useNavigate();

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

    /**
     * Gestion de la déconnexion
     */
    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <div className="logo">
                    <img className='logo-icon' src="/images/logo2.png" alt="GardenDesign" />
                </div>

                <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                        <Home className="nav-icon" size={18} />
                        Accueil
                    </Link>
                    <a href="#services" className={`nav-link ${current === 'services' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                        <Palette className="nav-icon" size={18} />
                        Services
                    </a>
                    <a href="#contact" className={`nav-link ${current === 'contact' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                        <Globe className="nav-icon" size={18} />
                        Contact
                    </a>

                    {isAuthenticated ? (
                        <>
                            <Link to="/cart" className="nav-link cart-link" onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="cart-container">
                                    <ShoppingCart className="nav-icon" size={18} />
                                    Panier
                                    {cartItems > 0 && (
                                        <span className="cart-badge">{cartItems}</span>
                                    )}
                                </div>
                            </Link>

                            <button
                                className="nav-link logout-btn"
                                onClick={handleLogout}
                            >
                                <LogOut className="nav-icon" size={18} />
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                            <User className="nav-icon" size={18} />
                            Connexion
                        </Link>
                    )}
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

