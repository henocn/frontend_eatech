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
            welcome: 'Bienvenue',
            titleMain: 'Next Level Design',
            subtitle: "Nous sommes votre agence créative",
            description: "Nous réalisons votre vision – créatif, individuel, réussi. Notre équipe jeune et créative concrétise vos idées avec passion et savoir-faire.",
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
        },
        portfolio: {
            title: 'Nos Réalisations',
            subtitle: 'Découvrez quelques-uns de nos projets réalisés dans notre studio'
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
            welcome: 'Welcome',
            titleMain: 'Next Level Design',
            subtitle: 'We are your creative agency',
            description: "We build your vision – creative, individual, successful. Our young, creative team brings your ideas to life with passion and expertise.",
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
        },
        portfolio: {
            title: 'Our Portfolio',
            subtitle: 'Discover some of our projects created in our studio'
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

