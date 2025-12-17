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
    const [selectedCategory, setSelectedCategory] = useState('all');
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

    /**
     * Filtre les services par catégorie
     */
    const filteredServices = selectedCategory === 'all'
        ? services
        : services.filter(service => service.category === selectedCategory);

    const categories = ['all', 'design', 'animation', 'icon'];
    const categoryLabels = {
        all: t('services.all'),
        design: t('services.design'),
        animation: t('services.animation'),
        icon: t('services.icon')
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

                <div className="category-filters">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {categoryLabels[category]}
                        </button>
                    ))}
                </div>

                <div className="services-grid">
                    {filteredServices.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>

                {filteredServices.length === 0 && (
                    <div className="no-results">
                        <p>{t('services.noResults')}</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Services;

