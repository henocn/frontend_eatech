import { useEffect, useRef, useState } from 'react';
import { Palette, Sparkles, Target, Layers, ArrowRight, Zap, Code, Brush } from 'lucide-react';
import './ServiceCard.css';



/**
 * Mapping des icônes par catégorie avec icônes supplémentaires pour l'animation
 */
const iconMap = {
    design: { main: Palette, accent: Brush },
    animation: { main: Sparkles, accent: Zap },
    icon: { main: Target, accent: Code },
    default: { main: Layers, accent: Code },
};



/**
 * Composant ServiceCard professionnel avec icône animée et design moderne
 */
function ServiceCard({ service, delay = 0 }) {
    const cardRef = useRef(null);
    const iconRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // AOS gère les animations au scroll
    }, []);

    const icons = iconMap[service.category] || iconMap.default;
    const MainIcon = icons.main;
    const AccentIcon = icons.accent;

    // Texte réduit - juste le titre et une description courte
    const shortDescription = service.description.split('.')[0] + '.';

    return (
        <div
            ref={cardRef}
            className="service-card"
            data-aos="fade-up"
            data-aos-delay={delay}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="service-card-background"></div>
            <div className="service-glow"></div>
            
            <div className="service-icon-container">
                <div className="service-icon-wrapper" ref={iconRef}>
                    <div className="icon-main">
                        <MainIcon className="service-icon" size={56} strokeWidth={1.5} />
                    </div>
                    <div className={`icon-accent ${isHovered ? 'visible' : ''}`}>
                        <AccentIcon className="accent-icon" size={32} strokeWidth={2} />
                    </div>
                    <div className="icon-ring"></div>
                    <div className="icon-particles">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{shortDescription}</p>
                <div className="service-link">
                    <span>Découvrir</span>
                    <ArrowRight className="arrow-icon" size={16} />
                </div>
            </div>

            <div className="service-border"></div>
        </div>
    );
}

export default ServiceCard;
