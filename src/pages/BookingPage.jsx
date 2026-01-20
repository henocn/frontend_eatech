import React, { useState, useEffect } from "react";
import { ShoppingCart, Check } from "lucide-react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Modal from "../components/modal/Modal";
import api from "../utils/axiosInstance";

import StudioList from "../components/studios/StudioList";
import DecorList from "../components/decors/DecorList";
import CalendarPicker from "../components/calendar/CalendarPicker";
import TimePicker from "../components/timepicker/TimePicker";
import StepIndicator from "../components/stepsIndicator/StepIndicator";

import "../App.css";

/**
 * BookingPage orchestre les étapes de réservation :
 * 1. Studio
 * 2. Décor
 * 3. Date & heure
 */
const BookingPage = () => {
  // Étape courante
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);

  // Sélections utilisateur
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [selectedDecor, setSelectedDecor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSessions, setSelectedSessions] = useState([]);

  // Modals
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
  const handleAddToCart = async (session) => {
    // Afficher le modal de confirmation
    setSessionsToAdd([session]);
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

      // Fermer le modal de confirmation et afficher le modal de succès
      setShowConfirmModal(false);
      setShowSuccessModal(true);

      // Réinitialiser après 3 secondes
      setTimeout(() => {
        setShowSuccessModal(false);
        setSelectedSessions([]);
        setCurrentStep(1);
        setMaxStepReached(1);
        setSelectedStudio(null);
        setSelectedDecor(null);
        setSelectedDate(null);
        setSessionsToAdd([]);
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      alert("Erreur: " + (error.message || "Une erreur est survenue"));
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="app">
      <Header />

      <main className="booking-main">
        {/* Indicateur d'étapes */}
        <StepIndicator
          currentStep={currentStep}
          maxStepReached={maxStepReached}
          onStepChange={setCurrentStep}
        />

        {/* ===== ÉTAPE 1 : STUDIO ===== */}
        {currentStep === 1 && (
          <StudioList
            onSelectStudio={(studio) => {
              setSelectedStudio(studio);
              setCurrentStep(2);
              setMaxStepReached(2);
            }}
          />
        )}

        {/* ===== ÉTAPE 2 : DÉCOR ===== */}
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

        {/* ===== ÉTAPE 3 : DATE & HEURE ===== */}
        {currentStep === 3 && selectedDecor && (
          <div className="schedule-step">
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
        )}
      </main>

      {/* Modal de confirmation */}
      <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2 style={{ marginBottom: "16px", color: "#1f2937" }}>Confirmer l'ajout au panier?</h2>
          
          <div style={{ 
            background: "#f9fafb", 
            borderRadius: "8px", 
            padding: "16px", 
            marginBottom: "24px", 
            textAlign: "left",
            maxHeight: "300px",
            overflowY: "auto"
          }}>
            {sessionsToAdd.map((session, index) => {
              const date = new Date(session.date);
              const dayName = date.toLocaleDateString('fr-FR', { weekday: 'long' });
              const formattedDate = date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
              const startHour = session.startTime.split(':')[0];
              const endHour = session.endTime.split(':')[0];
              
              return (
                <div key={index} style={{ 
                  padding: "12px", 
                  marginBottom: index < sessionsToAdd.length - 1 ? "12px" : "0",
                  borderBottom: index < sessionsToAdd.length - 1 ? "1px solid #e5e7eb" : "none"
                }}>
                  <p style={{ margin: "0", color: "#374151", fontWeight: "600" }}>
                    {dayName.charAt(0).toUpperCase() + dayName.slice(1)} {formattedDate}
                  </p>
                  <p style={{ margin: "8px 0 0 0", color: "#6b7280" }}>
                    de {session.startTime} à {session.endTime}
                  </p>
                </div>
              );
            })}
          </div>

          <p style={{ color: "#6b7280", marginBottom: "24px", fontSize: "0.9rem" }}>
            {sessionsToAdd.length} session{sessionsToAdd.length > 1 ? 's' : ''} • {sessionsToAdd.reduce((total, session) => total + session.hours, 0)}h de tournage
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              onClick={() => setShowConfirmModal(false)}
              style={{
                padding: "10px 20px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                background: "#ffffff",
                color: "#374151",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              Annuler
            </button>
            <button
              onClick={handleConfirmAddToCart}
              style={{
                padding: "10px 20px",
                borderRadius: "6px",
                border: "none",
                background: "#10b981",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <Check size={18} />
              Confirmer
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal de succès */}
      <Modal isOpen={showSuccessModal} onClose={() => {}}>
        <div style={{ textAlign: "center", padding: "30px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
          <h2 style={{ marginBottom: "16px", color: "#10b981" }}>Panier validé!</h2>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>
            Vos sessions ont été ajoutées au panier. Allez dans l'onglet panier et validez le paiement pour terminer la procédure.
          </p>
          <button
            onClick={() => setShowSuccessModal(false)}
            style={{
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              background: "#10b981",
              color: "white",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Fermer
          </button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

export default BookingPage;
