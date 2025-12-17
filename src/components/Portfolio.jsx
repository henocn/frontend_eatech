import { useLanguage } from '../contexts/LanguageContext';
import { Video, Image as ImageIcon, Play } from 'lucide-react';
import './Portfolio.css';



/**
 * Composant Portfolio pour afficher les réalisations (images/vidéos)
 */
function Portfolio() {
    const { t } = useLanguage();

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
                            className="portfolio-item"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="portfolio-media">
                                {item.type === 'video' ? (
                                    <>
                                        <Video className="media-icon" size={48} />
                                        <div className="play-overlay">
                                            <Play className="play-icon" size={32} fill="white" />
                                        </div>
                                    </>
                                ) : (
                                    <ImageIcon className="media-icon" size={48} />
                                )}
                            </div>
                            <div className="portfolio-overlay">
                                <h3 className="portfolio-title">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Portfolio;

