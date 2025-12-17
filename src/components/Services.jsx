import { useState, useEffect, useRef } from 'react';
import apiService from '../services/apiService';
import ServiceCard from './ServiceCard';
import { useLanguage } from '../contexts/LanguageContext';
import './Services.css';



/**
 * Composant Services qui affiche la liste des services disponibles
 */
function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const { t } = useLanguage();

    useEffect(() => {
        loadServices();
    }, []);

    useEffect(() => {
        // Animation au scroll
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );

        if (headerRef.current) observer.observe(headerRef.current);
        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, [services]);

    /**
     * Charge les services depuis l'API ou les fichiers JSON
     */
    const loadServices = async () => {
        try {
            setLoading(true);
            // Utilise les données JSON locales pour les tests
            const data = await apiService.getServices(true);
            setServices(data);
            setError(null);
        } catch (err) {
            setError(t('services.error'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <section id="services" className="services">
                <div className="services-container">
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>{t('services.loading')}</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="services" className="services">
                <div className="services-container">
                    <div className="error-message">
                        <p>{error}</p>
                        <button onClick={loadServices} className="btn btn-primary">
                            {t('services.retry')}
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="services" className="services" ref={sectionRef}>
            <div className="services-container">
                <div className="services-header" ref={headerRef}>
                    <h2 className="section-title">{t('services.title')}</h2>
                    <p className="section-subtitle">
                        {t('services.subtitle')}
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <ServiceCard 
                            key={service.id} 
                            service={service}
                            delay={index * 100}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;

