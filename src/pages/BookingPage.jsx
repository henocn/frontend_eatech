import React, { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import StudioList from "../components/studios/StudioList";
import DecorList from "../components/decors/DecorList";
// import CalendarPicker from "../components/calendar/CalendarPicker";
// import TimePicker from "../components/timepicker/TimePicker";
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
  const [selectedTime, setSelectedTime] = useState(null);

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
            {/* <CalendarPicker
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />

            {selectedDate && (
              <TimePicker
                selectedTime={selectedTime}
                onSelectTime={setSelectedTime}
              />
            )} */}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;
