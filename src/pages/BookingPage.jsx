import React, { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import StudioList from "../components/studios/StudioList";
import "../App.css";

/**
 * BookingPage orchestrera les étapes de réservation :
 * 1. Sélection du studio
 * 2. Sélection du décor
 * 3. Sélection date & heure
 */
const BookingPage = () => {
  // Étape actuelle : 1 = studio, 2 = décor, 3 = date/heure
  const [currentStep, setCurrentStep] = useState(1);

  // Studio sélectionné (pour passer à l'étape 2)
  const [selectedStudio, setSelectedStudio] = useState(null);

  // Décor sélectionné (pour passer à l'étape 3)
  const [selectedDecor, setSelectedDecor] = useState(null);

  // Date et heure sélectionnées
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div className="app">
      <Header />

      <main className="booking-main">
        {/* Étape 1 : choisir un studio */}
        {currentStep === 1 && (
          <StudioList
            onSelectStudio={(studio) => {
              setSelectedStudio(studio);
              setCurrentStep(2);
            }}
          />
        )}

        {/* Étape 2 : décor (sera ajouté plus tard) */}
        {currentStep === 2 && (
          <div className="decor-step">
            {/* Décors + modal seront intégrés ici */}
          </div>
        )}

        {/* Étape 3 : date et heure (sera ajouté plus tard) */}
        {currentStep === 3 && (
          <div className="schedule-step">
            {/* CalendarPicker et TimePicker seront intégrés ici */}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;
