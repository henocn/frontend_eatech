import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './BookingButton.css';



/**
 * Bouton de réservation sticky/floating qui reste visible sur la page
 */
function BookingButton() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            // Afficher le bouton après un certain scroll
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /**
     * Gère le clic sur le bouton de réservation
     */
    const handleBookingClick = () => {
        // Navigue vers la page de réservation
        navigate('/booking');
    };

    if (!isVisible) return null;

    return (
        <button 
            className="booking-button"
            onClick={handleBookingClick}
            aria-label={t('booking.button')}
        >
            <Calendar className="booking-icon" size={20} />
            <span className="booking-text">{t('booking.button')}</span>
        </button>
    );
}

export default BookingButton;

