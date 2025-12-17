import { useState } from 'react';
import './ServiceCard.css';



/**
 * Composant ServiceCard pour afficher une carte de service individuelle
 */
function ServiceCard({ service }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`service-card ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>

            <ul className="service-features">
                {service.features.map((feature, index) => (
                    <li key={index} className="feature-item">
                        <span className="feature-check">✓</span>
                        {feature}
                    </li>
                ))}
            </ul>

            <div className="service-footer">
                <div className="service-price">{service.price}</div>
                <button className="service-btn">
                    En savoir plus
                </button>
            </div>

            <div className="service-gradient"></div>
        </div>
    );
}

export default ServiceCard;

