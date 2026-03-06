import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Modal from "../components/modal/Modal";
import { useAuth } from "../contexts/AuthContext";
import api from "../utils/axiosInstance";

import StudioList from "../components/studios/StudioList";
import DecorList from "../components/decors/DecorList";
import CalendarPicker from "../components/calendar/CalendarPicker";
import TimePicker from "../components/timepicker/TimePicker";
import StepIndicator from "../components/stepsIndicator/StepIndicator";

import "../App.css";

/** Réservation : soit 3 étapes (studio → décor → date/heure), soit une seule page date/heure si décor déjà choisi. */
const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchCartItems } = useAuth();

  const stateDecor = location.state?.decor;
  const isDirectDecorBooking = !!stateDecor;

  const [currentStep, setCurrentStep] = useState(isDirectDecorBooking ? 3 : 1);
  const [maxStepReached, setMaxStepReached] = useState(isDirectDecorBooking ? 3 : 1);
  const [selectedStudio, setSelectedStudio] = useState(
    stateDecor?.studio_info ? { id: stateDecor.studio_info.id, name: stateDecor.studio_info.name } : null
  );
  const [selectedDecor, setSelectedDecor] = useState(
    stateDecor ? { id: stateDecor.id, name: stateDecor.name, short_description: stateDecor.short_description, hour_price: stateDecor.hour_price, max_persons: stateDecor.max_persons } : null
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSessions, setSelectedSessions] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sessionsToAdd, setSessionsToAdd] = useState([]);

  // Gestionnaire pour ajouter/supprimer des sessions
  const handleAddSession = (newSession, dateToRemove = null) => {
    if (dateToRemove) {
      // Supprimer une session
      setSelectedSessions(prev =>
        prev.filter(session =>
          session.date.toDateString() !== dateToRemove.toDateString()
        )
      );
    } else if (newSession) {
      // Ajouter une session
      setSelectedSessions(prev => [...prev, newSession]);
    }
  };

  // Gestionnaire pour ajouter au panier
  const handleAddToCart = (sessions) => {
    // Afficher le modal de confirmation avec toutes les sessions
    setSessionsToAdd(Array.isArray(sessions) ? sessions : [sessions]);
    setShowConfirmModal(true);
  };

  // Gestionnaire pour confirmer l'ajout au panier
  const handleConfirmAddToCart = async () => {
    try {
      // Récupérer les informations utilisateur du localStorage
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        alert("Veuillez vous reconnecter pour ajouter au panier");
        setShowConfirmModal(false);
        return;
      }

      const user = JSON.parse(userStr);
      const clientId = user.client_id;

      if (!clientId) {
        alert("ID client introuvable. Veuillez vous reconnecter");
        setShowConfirmModal(false);
        return;
      }

      // Ajouter chaque session au panier
      for (const session of sessionsToAdd) {
        const sessionDate = session.date.toISOString().split('T')[0];
        const payload = {
          client: clientId,
          day: sessionDate,
          start_time: `${session.startTime}:00`,
          end_time: `${session.endTime}:00`,
          photography_set: selectedDecor?.id,
          status: "pending"
        };
        await api.post("/sessions/", payload);
      }

      // Actualiser le badge du panier
      fetchCartItems();

      // Fermer le modal de confirmation et afficher le modal de succès
      setShowConfirmModal(false);
      setShowSuccessModal(true);

      // Rediriger vers le panier après 5 secondes
      setTimeout(() => {
        setShowSuccessModal(false);
        setSelectedSessions([]);
        setSelectedDate(null);
        setSessionsToAdd([]);
        if (!isDirectDecorBooking) {
          setCurrentStep(1);
          setMaxStepReached(1);
          setSelectedStudio(null);
          setSelectedDecor(null);
        }
        navigate('/cart');
      }, 5000);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      alert("Erreur: " + (error.message || "Une erreur est survenue"));
      setShowConfirmModal(false);
    }
  };

  const scheduleContent = selectedDecor && (
    <div className="schedule-step">
      {isDirectDecorBooking && (
        <h2 className="booking-direct-title">
          Choisir date et heure — {selectedDecor.name}
        </h2>
      )}
      <CalendarPicker
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        studioId={selectedStudio?.id}
        selectedSessions={selectedSessions}
      />
      <TimePicker
        selectedDate={selectedDate}
        selectedSessions={selectedSessions}
        onAddSession={handleAddSession}
        selectedDecor={selectedDecor}
        onAddToCart={handleAddToCart}
      />
    </div>
  );

  return (
    <div className="app">
      <Header />

      <main className="booking-main">
        {isDirectDecorBooking ? (
          scheduleContent
        ) : (
          <>
            <StepIndicator
              currentStep={currentStep}
              maxStepReached={maxStepReached}
              onStepChange={setCurrentStep}
            />
            {currentStep === 1 && (
              <StudioList
                onSelectStudio={(studio) => {
                  setSelectedStudio(studio);
                  setCurrentStep(2);
                  setMaxStepReached(2);
                }}
              />
            )}
            {currentStep === 2 && selectedStudio && (
              <DecorList
                studioId={selectedStudio.id}
                onSelectDecor={(decor) => {
                  setSelectedDecor(decor);
                  setCurrentStep(3);
                  setMaxStepReached(3);
                }}
              />
            )}
            {currentStep === 3 && scheduleContent}
          </>
        )}
      </main>

      {/* Modal de confirmation */}
      <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        <div style={{ textAlign: "center" }}>
          <h2 className="modal-confirmation-title">Confirmer l'ajout au panier?</h2>
          
          <div className="modal-confirmation-summary">
            {sessionsToAdd.map((session, index) => {
              const date = new Date(session.date);
              const dayName = date.toLocaleDateString('fr-FR', { weekday: 'long' });
              const formattedDate = date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
              const startHour = session.startTime.split(':')[0];
              const endHour = session.endTime.split(':')[0];
              
              return (
                <div key={index} className="modal-session-item">
                  <p className="modal-session-date">
                    {dayName.charAt(0).toUpperCase() + dayName.slice(1)} {formattedDate}
                  </p>
                  <p className="modal-session-time">
                    de {session.startTime} à {session.endTime}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="modal-summary-text">
            {sessionsToAdd.length} session{sessionsToAdd.length > 1 ? 's' : ''} • {sessionsToAdd.reduce((total, session) => total + session.hours, 0)}h de tournage
          </p>

          <div className="modal-button-group">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="modal-cancel-btn"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirmAddToCart}
              className="modal-confirm-btn"
            >
              <Check size={18} />
              Confirmer
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de succès */}
      <Modal isOpen={showSuccessModal} onClose={() => {}}>
        <div style={{ textAlign: "center" }}>
          <div className="modal-success-checkmark">✓</div>
          <h2 className="modal-success-title">Panier validé!</h2>
          <p className="modal-success-text">
            Vos sessions ont été ajoutées au panier. Allez dans l'onglet panier et validez le paiement pour terminer la procédure.
          </p>
          <button
            onClick={() => {
              setShowSuccessModal(false);
              navigate('/cart');
            }}
            className="modal-success-btn"
          >
            <span>Valider le paiement</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default BookingPage;
