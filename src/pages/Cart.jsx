import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, Package, Trash2, CheckCircle, XCircle } from 'lucide-react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/axiosInstance';
import '../App.css';
import './Cart.css';

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmingSession, setConfirmingSession] = useState(null);
  const [cancellingSession, setCancellingSession] = useState(null);

  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchCartData();
  }, [isAuthenticated, navigate]);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/carts/?user=${user.id}`);

      if (response && response.length > 0) {
        setCartData(response[0]);
      } else {
        setCartData(null);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Erreur lors du chargement du panier');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSession = async (sessionId) => {
    try {
      setConfirmingSession(sessionId);
      // TODO: Implement session confirmation API call
      await api.post(`/sessions/${sessionId}/confirm/`);

      // Refresh cart data
      await fetchCartData();
      setConfirmingSession(null);
    } catch (error) {
      console.error('Error confirming session:', error);
      setError('Erreur lors de la confirmation de la session');
      setConfirmingSession(null);
    }
  };

  const handleCancelSession = async (sessionId) => {
    try {
      setCancellingSession(sessionId);
      // TODO: Implement session cancellation API call
      await api.delete(`/sessions/${sessionId}/`);

      // Refresh cart data
      await fetchCartData();
      setCancellingSession(null);
    } catch (error) {
      console.error('Error cancelling session:', error);
      setError('Erreur lors de l\'annulation de la session');
      setCancellingSession(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString.slice(0, 5); // HH:MM format
  };

  if (loading) {
    return (
      <div className="app">
        <Header />
        <main className="cart-main">
          <div className="cart-container">
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Chargement du panier...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <Header />
        <main className="cart-main">
          <div className="cart-container">
            <div className="error-state">
              <XCircle size={48} className="error-icon" />
              <h2>Erreur</h2>
              <p>{error}</p>
              <button onClick={fetchCartData} className="retry-btn">
                Réessayer
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="cart-main">
        <div className="cart-container">
          <div className="cart-header">
            <h1>Mon Panier</h1>
            <p>Gérez vos sessions de photographie</p>
          </div>

          {!cartData || !cartData.session_details || cartData.session_details.length === 0 ? (
            <div className="empty-cart">
              <Package size={64} className="empty-icon" />
              <h2>Votre panier est vide</h2>
              <p>Vous n'avez pas encore de sessions programmées.</p>
              <button onClick={() => navigate('/booking')} className="booking-btn">
                Réserver une session
              </button>
            </div>
          ) : (
            <>
              <div className="cart-sessions">
                {cartData.session_details.map((session) => (
                  <div key={session.id} className="session-card">
                    <div className="session-header">
                      <h3>Session #{session.id}</h3>
                      <div className="session-status">
                        <span className={`status-badge ${session.status}`}>
                          {session.status === 'confirmed' ? 'Confirmée' :
                           session.status === 'pending' ? 'En attente' : session.status}
                        </span>
                      </div>
                    </div>

                    <div className="session-details">
                      <div className="detail-row">
                        <Calendar size={18} />
                        <span>{session.period_details && session.period_details.length > 0 ? formatDate(session.period_details[0].day) : ''}</span>
                      </div>

                      <div className="detail-row">
                        <Clock size={18} />
                        <span>
                          {session.period_details && session.period_details.map((period, index) => (
                            <span key={period.id}>
                              {formatTime(period.start_time)} - {formatTime(period.end_time)}
                              {index < session.period_details.length - 1 && ', '}
                            </span>
                          ))}
                        </span>
                      </div>

                      <div className="detail-row">
                        <Users size={18} />
                        <span>{session.client_details?.first_name} {session.client_details?.last_name}</span>
                      </div>

                      {session.equipments && session.equipments.length > 0 && (
                        <div className="detail-row">
                          <Package size={18} />
                          <span>Équipements: {session.equipments.length} élément(s)</span>
                        </div>
                      )}
                    </div>

                    <div className="session-actions">
                      {session.status === 'pending' && (
                        <button
                          className="confirm-btn"
                          onClick={() => handleConfirmSession(session.id)}
                          disabled={confirmingSession === session.id}
                        >
                          {confirmingSession === session.id ? (
                            <>
                              <div className="loading-spinner-small"></div>
                              Confirmation...
                            </>
                          ) : (
                            <>
                              <CheckCircle size={18} />
                              Confirmer
                            </>
                          )}
                        </button>
                      )}

                      <button
                        className="cancel-btn"
                        onClick={() => handleCancelSession(session.id)}
                        disabled={cancellingSession === session.id}
                      >
                        {cancellingSession === session.id ? (
                          <>
                            <div className="loading-spinner-small"></div>
                            Annulation...
                          </>
                        ) : (
                          <>
                            <Trash2 size={18} />
                            Annuler
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Nombre de sessions:</span>
                  <span>{cartData.session_count}</span>
                </div>
                <div className="summary-row total">
                  <span>Prix total:</span>
                  <span>{cartData.total_price?.toLocaleString()} FCFA</span>
                </div>
              </div>

              <div className="cart-actions">
                <button onClick={() => navigate('/booking')} className="add-more-btn">
                  Ajouter une session
                </button>
                <button className="checkout-btn">
                  Procéder au paiement
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;