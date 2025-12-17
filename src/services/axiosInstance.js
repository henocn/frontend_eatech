import axios from 'axios';



/**
 * Configuration de base de l'instance axios
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';



/**
 * Classe pour gérer les appels API avec axios
 * Gère l'authentification, les erreurs et la configuration de base
 */
class AxiosInstance {
    constructor() {
        this.instance = axios.create({
            baseURL: BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    /**
     * Configure les intercepteurs pour les requêtes et réponses
     */
    setupInterceptors() {
        // Intercepteur pour les requêtes
        this.instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('access_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Intercepteur pour les réponses
        this.instance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                if (error.response?.status === 401) {
                    // Gérer la déconnexion ou le refresh token ici
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                }
                return Promise.reject(error);
            }
        );
    }

    /**
     * Méthode GET
     */
    async get(url, config = {}) {
        try {
            const response = await this.instance.get(url, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Méthode POST
     */
    async post(url, data = {}, config = {}) {
        try {
            const response = await this.instance.post(url, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Méthode PUT
     */
    async put(url, data = {}, config = {}) {
        try {
            const response = await this.instance.put(url, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Méthode DELETE
     */
    async delete(url, config = {}) {
        try {
            const response = await this.instance.delete(url, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Méthode PATCH
     */
    async patch(url, data = {}, config = {}) {
        try {
            const response = await this.instance.patch(url, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Gère les erreurs de manière centralisée
     */
    handleError(error) {
        if (error.response) {
            // La requête a été faite et le serveur a répondu avec un code d'erreur
            return {
                message: error.response.data?.message || error.response.data?.error || 'Une erreur est survenue',
                status: error.response.status,
                data: error.response.data,
            };
        } else if (error.request) {
            // La requête a été faite mais aucune réponse n'a été reçue
            return {
                message: 'Aucune réponse du serveur. Vérifiez votre connexion.',
                status: 0,
            };
        } else {
            // Quelque chose s'est mal passé lors de la configuration de la requête
            return {
                message: error.message || 'Une erreur est survenue',
                status: 0,
            };
        }
    }

    /**
     * Définit le token d'authentification
     */
    setAuthToken(token) {
        if (token) {
            localStorage.setItem('access_token', token);
            this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            localStorage.removeItem('access_token');
            delete this.instance.defaults.headers.common['Authorization'];
        }
    }
}

// Export d'une instance unique (singleton)
export default new AxiosInstance();

