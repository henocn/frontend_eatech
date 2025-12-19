import { useEffect, useRef } from 'react';
import './Portfolio.css';
import PhotographySets from '../photographysets/PhotographySets';



/**
 * Composant Portfolio avec vidéo background et cards de réalisations
 */
function Portfolio() {
    
    // photography carousel will handle video playback

    // Données de démonstration - sera remplacé par les vraies données plus tard
    const portfolioItems = [
        { id: 1, type: 'video', title: 'Réalisation 1' },
        { id: 2, type: 'image', title: 'Réalisation 2' },
        { id: 3, type: 'video', title: 'Réalisation 3' },
        { id: 4, type: 'image', title: 'Réalisation 4' },
        { id: 5, type: 'video', title: 'Réalisation 5' },
        { id: 6, type: 'image', title: 'Réalisation 6' },
    ];

    return (
        <section id="portfolio" className="portfolio">
            {/* Section vidéo background */}
            <PhotographySets />

            {/* Section des réalisations avec cards */}
            <div className="portfolio-content">
                <div className="portfolio-container">
                    <div className="portfolio-header" data-aos="fade-up">
                        <h2 className="section-title">Nos Réalisations</h2>
                        <p className="section-subtitle">
                            Découvrez quelques-uns de nos projets réalisés dans notre studio
                        </p>
                    </div>

                    <div className="portfolio-grid">
                        {portfolioItems.map((item, index) => (
                            <div
                                key={item.id}
                                className="portfolio-card"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="portfolio-card-media">
                                    <div className="portfolio-placeholder">
                                        {item.type === 'video' ? '🎬' : '🖼️'}
                                    </div>
                                </div>
                                <div className="portfolio-card-content">
                                    <h3 className="portfolio-card-title">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Portfolio;
