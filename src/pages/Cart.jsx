import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, Package, Trash2, CheckCircle, XCircle, DollarSign, CreditCard } from 'lucide-react';
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
        return timeString.slice(0, 5);
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
                        <div>
                            <div className="cart-summary">
                                <div className="summary-row">
                                    <div className="summary-icon-wrapper sessions">
                                        <Calendar size={18} />
                                    </div>
                                    <span className="summary-label">Nombre de sessions:</span>
                                    <span className="summary-value">{cartData.session_count}</span>
                                </div>
                                <div className="summary-row total">
                                    <div className="summary-icon-wrapper price">
                                        <DollarSign size={18} />
                                    </div>
                                    <span className="summary-label">Prix total:</span>
                                    <span className="summary-value">{cartData.total_price?.toLocaleString()} FCFA</span>
                                </div>
                            </div>

                            <div className="cart-table-container">
                                <table className="cart-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Horaires</th>
                                            <th>Équipements</th>
                                            <th>Statut</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartData.session_details.map((session) => (
                                            <tr key={session.id}>
                                                <td>
                                                    {session.period_details && session.period_details.length > 0
                                                        ? formatDate(session.period_details[0].day)
                                                        : '-'
                                                    }
                                                </td>
                                                <td>
                                                    {session.period_details && session.period_details.map((period, index) => (
                                                        <div key={period.id} className="time-slot">
                                                            {formatTime(period.start_time)} - {formatTime(period.end_time)}
                                                            {index < session.period_details.length - 1 && <br />}
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {session.equipments && session.equipments.length > 0
                                                        ? `${session.equipments.length} élément(s)`
                                                        : '-'
                                                    }
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${session.status}`}>
                                                        {session.status === 'confirmed' ? 'Confirmée' :
                                                            session.status === 'pending' ? 'En attente' : session.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="cancel-btn"
                                                        onClick={() => handleCancelSession(session.id)}
                                                        disabled={cancellingSession === session.id}
                                                        title="Annuler la session"
                                                    >
                                                        {cancellingSession === session.id ? (
                                                            <div className="loading-spinner-small"></div>
                                                        ) : (
                                                            <Trash2 size={16} />
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>

                            <div className="cart-actions">
                                <button onClick={() => navigate('/booking')} className="add-more-btn">
                                    <Calendar size={16} />
                                    Ajouter
                                </button>
                                <button
                                    className="checkout-btn"
                                    disabled={cartData.session_details.some(session => session.status !== 'confirmed')}
                                >
                                    <CreditCard size={16} />
                                    Payer
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Cart;