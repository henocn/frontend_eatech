import axiosInstance from './axiosInstance';



/**
 * Service pour récupérer les données des services depuis l'API ou les fichiers JSON
 */
class ApiService {
    /**
     * Récupère la liste des services
     * Pour les tests, utilise les données JSON locales
     */
    async getServices(useLocalData = true) {
        if (useLocalData) {
            try {
                // Utilisation des données JSON locales pour les tests
                const response = await fetch('/data/services.json');
                const data = await response.json();
                return data.services;
            } catch (error) {
                console.error('Erreur lors du chargement des données locales:', error);
                throw error;
            }
        } else {
            // Utilisation de l'API réelle
            try {
                return await axiosInstance.get('/services/');
            } catch (error) {
                console.error('Erreur lors de la récupération des services:', error);
                throw error;
            }
        }
    }

    /**
     * Récupère un service spécifique par son ID
     */
    async getServiceById(id, useLocalData = true) {
        if (useLocalData) {
            const services = await this.getServices(true);
            return services.find(service => service.id === parseInt(id));
        } else {
            return await axiosInstance.get(`/services/${id}/`);
        }
    }

    /**
     * Filtre les services par catégorie
     */
    async getServicesByCategory(category, useLocalData = true) {
        const services = await this.getServices(useLocalData);
        return services.filter(service => service.category === category);
    }
}

export default new ApiService();

