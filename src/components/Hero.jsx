import { useEffect, useRef } from 'react';
import './Hero.css';



/**
 * Composant Hero avec animations et effets visuels
 */
function Hero() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);

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

        return () => {
            observer.disconnect();
        };
    }, []);

    const scrollToServices = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero" ref={heroRef}>
            <div className="hero-background">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>
            <div className="hero-content">
                <h1 className="hero-title" ref={titleRef}>
                    <span className="title-line">Créativité</span>
                    <span className="title-line">Innovation</span>
                    <span className="title-line highlight">Excellence</span>
                </h1>
                <p className="hero-subtitle" ref={subtitleRef}>
                    Des solutions de design, d'animations et d'icônes pour faire briller votre projet
                </p>
                <div className="hero-cta" ref={ctaRef}>
                    <button className="btn btn-primary" onClick={scrollToServices}>
                        Découvrir nos services
                    </button>
                    <button className="btn btn-secondary">
                        Nous contacter
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

