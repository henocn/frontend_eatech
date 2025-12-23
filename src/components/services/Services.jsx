import { useState, useEffect } from 'react';
import apiService from '../../utils/apiService';
import './Services.css';



/**
 * Composant Services qui affiche la liste des services disponibles
 */
function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        loadServices();
    }, []);

    // AOS gère maintenant les animations au scroll

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
            setError('Erreur lors du chargement des services');
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
                        <p>Chargement des services...</p>
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
                            Réessayer
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="services" className="services">
            <div className="services-container">
                <div className="services-header" data-aos="fade-up">
                    <h2 className="section-title">Nos Services</h2>
                    <p className="section-subtitle">
                        Des solutions créatives sur mesure pour transformer vos idées en réalité
                    </p>
                </div>

                <div className="services-marquee-wrapper">
                    <div className="services-marquee" aria-hidden="false">
                        <div className="marquee-track">
                            {services.map((service) => {
                                const words = service.description ? service.description.split(' ') : []
                                const short = service.category || (words.slice(0,2).join(' '))
                                return (
                                    <div className="marquee-item" key={service.id}>
                                        <span className="marquee-title">{service.title}</span>
                                        <span className="marquee-desc">{short}</span>
                                    </div>
                                )
                            })}
                            {/* duplicate once to create seamless loop */}
                            {services.map((service) => {
                                const words = service.description ? service.description.split(' ') : []
                                const short = service.category || (words.slice(0,2).join(' '))
                                return (
                                    <div className="marquee-item" key={`${service.id}-dup`}>
                                        <span className="marquee-title">{service.title}</span>
                                        <span className="marquee-desc">{short}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;

