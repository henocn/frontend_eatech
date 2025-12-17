import { createContext, useContext, useState, useEffect } from 'react';



const LanguageContext = createContext();



const translations = {
    fr: {
        nav: {
            home: 'Accueil',
            services: 'Services',
            about: 'À propos',
            contact: 'Contact'
        },
        hero: {
            title1: 'Créativité',
            title2: 'Innovation',
            title3: 'Excellence',
            subtitle: "Des solutions de design, d'animations et d'icônes pour faire briller votre projet",
            cta1: 'Découvrir nos services',
            cta2: 'Nous contacter'
        },
        services: {
            title: 'Nos Services',
            subtitle: 'Des solutions créatives sur mesure pour transformer vos idées en réalité',
            all: 'Tous',
            design: 'Design',
            animation: 'Animations',
            icon: 'Icônes',
            loading: 'Chargement des services...',
            error: 'Erreur lors du chargement des services',
            retry: 'Réessayer',
            noResults: 'Aucun service trouvé dans cette catégorie',
            learnMore: 'En savoir plus'
        },
        footer: {
            description: "Des solutions créatives et innovantes pour transformer vos idées en réalité.",
            services: 'Services',
            contact: 'Contact',
            follow: 'Suivez-nous',
            rights: 'Tous droits réservés.'
        },
        booking: {
            button: 'Réserver maintenant'
        }
    },
    en: {
        nav: {
            home: 'Home',
            services: 'Services',
            about: 'About',
            contact: 'Contact'
        },
        hero: {
            title1: 'Creativity',
            title2: 'Innovation',
            title3: 'Excellence',
            subtitle: 'Design, animation and icon solutions to make your project shine',
            cta1: 'Discover our services',
            cta2: 'Contact us'
        },
        services: {
            title: 'Our Services',
            subtitle: 'Creative solutions tailored to transform your ideas into reality',
            all: 'All',
            design: 'Design',
            animation: 'Animations',
            icon: 'Icons',
            loading: 'Loading services...',
            error: 'Error loading services',
            retry: 'Retry',
            noResults: 'No services found in this category',
            learnMore: 'Learn more'
        },
        footer: {
            description: "Creative and innovative solutions to transform your ideas into reality.",
            services: 'Services',
            contact: 'Contact',
            follow: 'Follow us',
            rights: 'All rights reserved.'
        },
        booking: {
            button: 'Book now'
        }
    }
};



/**
 * Provider pour gérer les traductions FR/EN de l'application
 */
export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || (navigator.language.startsWith('fr') ? 'fr' : 'en');
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.setAttribute('lang', language);
    }, [language]);

    /**
     * Change la langue de l'application
     */
    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    /**
     * Bascule entre français et anglais
     */
    const toggleLanguage = () => {
        setLanguage(prevLang => prevLang === 'fr' ? 'en' : 'fr');
    };

    /**
     * Récupère une traduction par sa clé
     */
    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

/**
 * Hook pour utiliser le contexte de langue
 */
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

