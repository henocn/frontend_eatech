import { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Hero.css';



/**
 * Composant Hero avec animations et effets visuels
 */
function Hero() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const videoRef = useRef(null);
    const { t } = useLanguage();

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

        if (titleRef.current) observer.observe(titleRef.current);
        if (subtitleRef.current) observer.observe(subtitleRef.current);
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
     * Scroll vers la section des services
     */
    const scrollToServices = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    /**
     * Scroll vers la section de contact
     */
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                    <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    {/* Vidéo de fallback - vous pouvez remplacer par votre propre vidéo */}
                </video>
                <div className="hero-video-overlay"></div>
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>
            <div className="hero-content">
                <h1 className="hero-title" ref={titleRef}>
                    <span className="title-line">{t('hero.title1')}</span>
                    <span className="title-line">{t('hero.title2')}</span>
                    <span className="title-line highlight">{t('hero.title3')}</span>
                </h1>
                <p className="hero-subtitle" ref={subtitleRef}>
                    {t('hero.subtitle')}
                </p>
                <div className="hero-cta" ref={ctaRef}>
                    <button className="btn btn-primary" onClick={scrollToServices}>
                        {t('hero.cta1')}
                    </button>
                    <button className="btn btn-secondary" onClick={scrollToContact}>
                        {t('hero.cta2')}
                    </button>
                </div>
            </div>
            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
            </div>
        </section>
    );
}

export default Hero;

