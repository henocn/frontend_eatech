import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import BookingButton from './components/BookingButton';
import './App.css';



/**
 * Composant principal de l'application
 */
function App() {
    useEffect(() => {
        // Animation au chargement de la page
        document.body.classList.add('fade-in');
        
        return () => {
            document.body.classList.remove('fade-in');
        };
    }, []);

    return (
        <ThemeProvider>
            <LanguageProvider>
                <div className="app">
                    <Header />
                    <main>
                        <Hero />
                        <Services />
                        <Portfolio />
                    </main>
                    <Footer />
                    <BookingButton />
                </div>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;
