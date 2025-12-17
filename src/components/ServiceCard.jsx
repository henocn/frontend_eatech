import { useEffect, useRef } from 'react';
import { Palette, Sparkles, Target, Layers } from 'lucide-react';
import './ServiceCard.css';



/**
 * Mapping des icônes par catégorie
 */
const iconMap = {
    design: Palette,
    animation: Sparkles,
    icon: Target,
    default: Layers,
};



/**
 * Composant ServiceCard simplifié avec icône animée et description
 */
function ServiceCard({ service, delay = 0 }) {
    const cardRef = useRef(null);
    const iconRef = useRef(null);

    useEffect(() => {
        // Animation au scroll avec délai
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('animate-in');
                        }, delay);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) observer.observe(cardRef.current);

        return () => observer.disconnect();
    }, [delay]);

    const IconComponent = iconMap[service.category] || iconMap.default;

    return (
        <div
            ref={cardRef}
            className="service-card"
        >
            <div className="service-glow"></div>
            <div className="service-icon-wrapper" ref={iconRef}>
                <IconComponent className="service-icon" size={64} strokeWidth={1.5} />
            </div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
        </div>
    );
}

export default ServiceCard;
