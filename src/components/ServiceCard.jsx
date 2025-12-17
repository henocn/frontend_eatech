import { useState, useEffect, useRef } from 'react';
import { Palette, Sparkles, Target, Monitor, Video, Image as ImageIcon, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './ServiceCard.css';



/**
 * Mapping des icônes par catégorie
 */
const iconMap = {
    design: Palette,
    animation: Sparkles,
    icon: Target,
};



/**
 * Composant ServiceCard pour afficher une carte de service individuelle
 */
function ServiceCard({ service }) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    const { t } = useLanguage();

    useEffect(() => {
        // Animation au scroll
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) observer.observe(cardRef.current);

        return () => observer.disconnect();
    }, []);

    const IconComponent = iconMap[service.category] || Palette;

    return (
        <div
            ref={cardRef}
            className={`service-card ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="service-icon">
                <IconComponent size={48} strokeWidth={1.5} />
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>

            <ul className="service-features">
                {service.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                        <Check className="feature-check" size={18} />
                        {feature}
                    </li>
                ))}
            </ul>

            <div className="service-footer">
                <div className="service-price">{service.price}</div>
                <button className="service-btn">
                    {t('services.learnMore')}
                </button>
            </div>

            <div className="service-gradient"></div>
        </div>
    );
}

export default ServiceCard;

