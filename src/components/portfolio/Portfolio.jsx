import { useState, useEffect, useRef } from 'react';
import './Portfolio.css';
import PhotographySets from '../photographysets/PhotographySets';
import Modal from '../modal/Modal';



/**
 * Composant Portfolio avec vidéo background et cards de réalisations
 */
function Portfolio() {
    const [selectedProject, setSelectedProject] = useState(null);
    
    // photography carousel will handle video playback

    // Données de démonstration - sera remplacé par les vraies données plus tard
    const portfolioItems = [
        { 
            id: 1, 
            type: 'video', 
            title: 'Réalisation 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        { 
            id: 2, 
            type: 'image', 
            title: 'Réalisation 2',
            description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
        },
        { 
            id: 3, 
            type: 'video', 
            title: 'Réalisation 3',
            description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliqua.'
        },
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
                                onClick={() => setSelectedProject(item)}
                            >
                                <div className="portfolio-card-media">
                                    <div className="portfolio-placeholder">
                                        {item.type === 'video' ? '🎬' : '🖼️'}
                                    </div>
                                </div>
                                <div className="portfolio-card-content">
                                    <div>
                                        <h3 className="portfolio-card-title">{item.title}</h3>
                                        <p className="portfolio-card-description">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal pour la description complète */}
            <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
                {selectedProject && (
                    <div className="portfolio-modal-content">
                        <h2 className="portfolio-modal-title">{selectedProject.title}</h2>
                        <p className="portfolio-modal-description">{selectedProject.description}</p>
                    </div>
                )}
            </Modal>
        </section>
    );
}

export default Portfolio;
