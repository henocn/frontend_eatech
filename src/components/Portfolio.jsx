import { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Portfolio.css';



/**
 * Composant Portfolio avec vidéo background et cards de réalisations
 */
function Portfolio() {
    const { t } = useLanguage();
    const videoRef = useRef(null);

    useEffect(() => {
        // Démarrage de la vidéo en boucle
        if (videoRef.current) {
            videoRef.current.play().catch(err => {
                console.log('Video autoplay prevented:', err);
            });
        }
    }, []);

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
            <div className="portfolio-video-section">
                <video
                    ref={videoRef}
                    className="portfolio-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/videos/video2.mp4" type="video/mp4" />
                </video>
                <div className="portfolio-video-overlay"></div>
            </div>

            {/* Section des réalisations avec cards */}
            <div className="portfolio-content">
                <div className="portfolio-container">
                    <div className="portfolio-header" data-aos="fade-up">
                        <h2 className="section-title">{t('portfolio.title')}</h2>
                        <p className="section-subtitle">
                            {t('portfolio.subtitle')}
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
