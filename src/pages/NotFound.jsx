import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="app">
      <Header />
      <main className="not-found-main">
        <div className="not-found-container">
          <div className="not-found-content">
            <div className="error-code">404</div>
            <h1>Page non trouvée</h1>
            <p>Désolé, la page que vous recherchez n'existe pas ou a été supprimée.</p>
            
            <div className="not-found-actions">
              <button 
                onClick={() => navigate('/')}
                className="not-found-btn primary"
              >
                <Home size={18} />
                <span>Retour à l'accueil</span>
              </button>
              <button 
                onClick={() => navigate(-1)}
                className="not-found-btn secondary"
              >
                <ArrowLeft size={18} />
                <span>Retour précédent</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
