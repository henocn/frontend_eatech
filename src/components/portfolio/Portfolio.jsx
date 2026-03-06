import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Clapperboard } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Portfolio.css';
import PhotographySets from '../photographysets/PhotographySets';
import Modal from '../modal/Modal';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

/**
 * Composant Portfolio avec video background et cards de realisations
 */
function Portfolio() {
    const navigate = useNavigate();
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animation du header
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Animation des cards avec stagger
            const cards = gridRef.current?.querySelectorAll('.portfolio-card');
            if (cards?.length) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 60, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.7,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: "top 80%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            }

            // Animation du CTA
            gsap.fromTo(ctaRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ctaRef.current,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    
    // photography carousel will handle video playback

    // Données de démonstration - sera remplacé par les vraies données plus tard
    const portfolioItems = [
        { 
            id: 1, 
            type: 'video', 
            title: 'Réalisation 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            media_type: 'video',
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        },
        { 
            id: 2, 
            type: 'image', 
            title: 'Réalisation 2',
            description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
            media_type: 'images',
            images: [
              'https://via.placeholder.com/800x500?text=Image+1',
              'https://via.placeholder.com/800x500?text=Image+2',
              'https://via.placeholder.com/800x500?text=Image+3',
            ]
        },
        { 
            id: 3, 
            type: 'video', 
            title: 'Réalisation 3',
            description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliqua.',
            media_type: 'video',
            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        },
    ];

    const handlePrevImage = () => {
        if (selectedProject && selectedProject.media_type === 'images') {
            setCurrentImageIndex((prev) => 
                prev === 0 ? selectedProject.images.length - 1 : prev - 1
            );
        }
    };

    const handleNextImage = () => {
        if (selectedProject && selectedProject.media_type === 'images') {
            setCurrentImageIndex((prev) => 
                prev === selectedProject.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const handleSelectProject = (item) => {
        setSelectedProject(item);
        setCurrentImageIndex(0);
    };

    return (
        <section id="portfolio" className="portfolio" ref={sectionRef}>
            {/* Section video background */}
            <PhotographySets />

            {/* Section des realisations avec cards */}
            <div className="portfolio-content">
                <div className="portfolio-container">
                    <div className="portfolio-header" ref={headerRef}>
                        <h2 className="section-title">Nos Realisations</h2>
                        <p className="section-subtitle">
                            Decouvrez quelques-uns de nos projets realises dans notre studio
                        </p>
                        <p className="portfolio-description">
                            Nous avons eu le privilege de travailler avec des clients varies : des particuliers souhaitant immortaliser leurs moments precieux, des agences creatives en quete de contenu de qualite, et meme l'Etat togolais pour des projets d'envergure nationale. Nos realisations couvrent plusieurs thematiques telles que la videographie publicitaire, les tournages haute gamme, les evenements professionnels et bien d'autres, le tout avec des equipements et un support technique professionnel de pointe.
                        </p>
                    </div>

                    <div className="portfolio-grid" ref={gridRef}>
                        {portfolioItems.map((item, index) => (
                            <div
                                key={item.id}
                                className="portfolio-card"
                                onClick={() => handleSelectProject(item)}
                            >
                                <div className="portfolio-card-media">
                                    <div className="portfolio-placeholder">
                                        {item.media_type === 'video' ? '🎬' : '🖼️'}
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

                {/* Section CTA - Reserver une session (style pub) */}
                <div className="portfolio-cta-stylized" ref={ctaRef}>
                    <div className="portfolio-cta-marquee">
                        <div className="portfolio-cta-text-wrapper">
                            <Clapperboard size={20} className="portfolio-cta-icon" />
                            <a href="/booking" className="portfolio-cta-text">Réservez votre session de tournage</a>
                            <a href="/booking" className="portfolio-cta-divider">•</a>
                            <Clapperboard size={20} className="portfolio-cta-icon" />
                            <a href="/booking" className="portfolio-cta-text">Réservez votre session de tournage</a>
                            <a href="/booking" className="portfolio-cta-divider">•</a>
                            <Clapperboard size={20} className="portfolio-cta-icon" />
                            <a href="/booking" className="portfolio-cta-text">Réservez votre session de tournage</a>
                            <a href="/booking" className="portfolio-cta-divider">•</a>
                            <Clapperboard size={20} className="portfolio-cta-icon" />
                            <a href="/booking" className="portfolio-cta-text">Réservez votre session de tournage</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal pour la description complète avec médias */}
            <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
                {selectedProject && (
                    <div className="portfolio-modal-content">
                        {/* Section médias */}
                        {selectedProject.media_type === 'video' && (
                            <div className="portfolio-modal-media-container">
                                <iframe
                                    className="portfolio-modal-video"
                                    src={selectedProject.video_url}
                                    title={selectedProject.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}

                        {selectedProject.media_type === 'images' && selectedProject.images?.length > 0 && (
                            <div className="portfolio-modal-carousel">
                                <div className="portfolio-modal-image-container">
                                    <img 
                                        src={selectedProject.images[currentImageIndex]} 
                                        alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                                        className="portfolio-modal-image"
                                    />
                                </div>

                                {selectedProject.images.length > 1 && (
                                    <>
                                        <button
                                            className="portfolio-carousel-btn portfolio-carousel-prev"
                                            onClick={handlePrevImage}
                                            aria-label="Image précédente"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            className="portfolio-carousel-btn portfolio-carousel-next"
                                            onClick={handleNextImage}
                                            aria-label="Image suivante"
                                        >
                                            <ChevronRight size={24} />
                                        </button>

                                        <div className="portfolio-carousel-indicators">
                                            {selectedProject.images.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`portfolio-indicator ${idx === currentImageIndex ? 'active' : ''}`}
                                                    onClick={() => setCurrentImageIndex(idx)}
                                                    aria-label={`Aller à l'image ${idx + 1}`}
                                                ></button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Section texte */}
                        <h2 className="portfolio-modal-title">{selectedProject.title}</h2>
                        <p className="portfolio-modal-description">{selectedProject.description}</p>
                    </div>
                )}
            </Modal>
        </section>
    );
}

export default Portfolio;
