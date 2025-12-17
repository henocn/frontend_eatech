import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import ServiceCard from './ServiceCard';
import './Services.css';



/**
 * Composant Services qui affiche la liste des services disponibles
 */
function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        loadServices();
    }, []);

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

    /**
     * Filtre les services par catégorie
     */
    const filteredServices = selectedCategory === 'all'
        ? services
        : services.filter(service => service.category === selectedCategory);

    const categories = ['all', 'design', 'animation', 'icon'];
    const categoryLabels = {
        all: 'Tous',
        design: 'Design',
        animation: 'Animations',
        icon: 'Icônes'
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
                <div className="services-header">
                    <h2 className="section-title">Nos Services</h2>
                    <p className="section-subtitle">
                        Des solutions créatives sur mesure pour transformer vos idées en réalité
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
                        <p>Aucun service trouvé dans cette catégorie</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Services;

