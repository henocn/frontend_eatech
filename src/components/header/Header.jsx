import { useState, useEffect } from 'react';
import { LayoutGrid, Menu, X, Moon, Sun, Mail, User, DoorOpen, Home, ShoppingCart, Image as ImageIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
    const location = useLocation();
    const isHomeActive = location.pathname === '/' && !current;
    const isDecorsActive = location.pathname === '/decors';
    const isServicesActive = location.pathname === '/' && current === 'services';
    const isContactActive = location.pathname === '/' && current === 'contact';
    const isCartActive = location.pathname === '/cart';
    const isAuthActive =
        location.pathname === '/login' ||
        location.pathname === '/register' ||
        location.pathname === '/forgot-password' ||
        location.pathname === '/auth/login' ||
        location.pathname === '/auth/register' ||
        location.pathname === '/auth/forgot-password';

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

    /**
     * Navigation vers la section services
     */
    const handleServicesClick = (e) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        
        if (location.pathname === '/') {
            // Si déjà sur la page d'accueil, scroll vers services
            const element = document.getElementById('services');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Sinon, naviguer vers l'accueil puis scroll
            navigate('/', { state: { scrollToServices: true } });
        }
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <Link to="/" className="logo" aria-label="Accueil">
                    <img className="logo-icon" src="/images/logo2.png" alt="EATECH - Studio" />
                </Link>

                <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
                    <Link to="/" className={`nav-link ${isHomeActive ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                        <Home className="nav-icon" size={18} />
                        Accueil
                    </Link>
                    <Link
                        to="/decors"
                        className={`nav-link ${isDecorsActive ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <ImageIcon className="nav-icon" size={18} />
                        Décors
                    </Link>
                    <button className={`nav-link ${isServicesActive ? 'active' : ''}`} onClick={handleServicesClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <LayoutGrid className="nav-icon" size={18} />
                        Services
                    </button>
                    <a href="#contact" className={`nav-link ${isContactActive ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                        <Mail className="nav-icon" size={18} />
                        Contact
                    </a>

                    {isAuthenticated ? (
                        <>
                            <Link to="/cart" className={`nav-link cart-link ${isCartActive ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                                <div className="cart-container">
                                    <ShoppingCart className="nav-icon" size={18} />
                                    Panier
                                    <span className="cart-badge" data-count={cartItems}>{cartItems}</span>
                                </div>
                            </Link>

                            <button
                                className="nav-link logout-btn"
                                onClick={handleLogout}
                            >
                                <DoorOpen className="nav-icon" size={18} />
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className={`nav-link ${isAuthActive ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
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

