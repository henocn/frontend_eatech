import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
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

  // Disponibilités du studio
  const [availability, setAvailability] = useState([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

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

  // Récupérer les disponibilités quand un studio est sélectionné
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedStudio) {
        setAvailability([]);
        return;
      }

      setLoadingAvailability(true);
      try {
        const data = await api.get(`/studios/${selectedStudio.id}/availability/`);
        setAvailability(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des disponibilités:", error);
        setAvailability([]);
      } finally {
        setLoadingAvailability(false);
      }
    };

    fetchAvailability();
  }, [selectedStudio]);

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
            {loadingAvailability ? (
              <div className="loading-availability">
                <div className="loading-spinner"></div>
                <p>Chargement des disponibilités...</p>
              </div>
            ) : (
              <>
                <CalendarPicker
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                  studioId={selectedStudio?.id}
                  availability={availability}
                />

                <TimePicker
                  selectedDate={selectedDate}
                  selectedSessions={selectedSessions}
                  onAddSession={handleAddSession}
                  availability={availability}
                />
              </>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;
