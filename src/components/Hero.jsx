import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import './Hero.css';



/**
 * Composant Hero avec animations et effets visuels
 */
function Hero() {
    const heroRef = useRef(null);
    const welcomeRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descriptionRef = useRef(null);
    const ctaRef = useRef(null);
    const videoRef = useRef(null);
    const { t } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        // Animation d'entrée au chargement
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

        if (welcomeRef.current) observer.observe(welcomeRef.current);
        if (titleRef.current) observer.observe(titleRef.current);
        if (subtitleRef.current) observer.observe(subtitleRef.current);
        if (descriptionRef.current) observer.observe(descriptionRef.current);
        if (ctaRef.current) observer.observe(ctaRef.current);

        // Démarrage de la vidéo en boucle
        if (videoRef.current) {
            videoRef.current.play().catch(err => {
                console.log('Video autoplay prevented:', err);
            });
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    /**
     * Navigue vers la page de réservation
     */
    const scrollToServices = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Contact scroll removed — secondary CTA will navigate to booking

    return (
        <section id="home" className="hero" ref={heroRef}>
            <div className="hero-background">
                <video
                    ref={videoRef}
                    className="hero-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/videos/video1.mp4" type="video/mp4" />
                </video>
                <div className="hero-video-overlay"></div>
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>
            <div className="hero-content">
                <div className="hero-welcome" ref={welcomeRef}>
                    {t('hero.welcome')}
                </div>
                <h1 className="hero-title" ref={titleRef}>
                    <span className="title-main">{t('hero.titleMain')}</span>
                </h1>
                <p className="hero-subtitle" ref={subtitleRef}>
                    {t('hero.subtitle')}
                </p>
                <p className="hero-description" ref={descriptionRef}>
                    {t('hero.description')}
                </p>
                <div className="hero-cta" ref={ctaRef}>
                    <button className="btn btn-primary" onClick={scrollToServices}>
                        {t('hero.cta1')}
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate('/booking')}>
                        {t('hero.cta2')}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero;

