import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Footer from './components/Footer';
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
        <div className="app">
            <Header />
            <main>
                <Hero />
                <Services />
            </main>
            <Footer />
        </div>
    );
}

export default App;
