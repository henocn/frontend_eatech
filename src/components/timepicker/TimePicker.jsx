import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import "./TimePicker.css";

const TimePicker = ({ selectedDate, selectedSessions, onAddSession, availability }) => {
  const [hours, setHours] = useState(1);
  const [inputError, setInputError] = useState(null);

  // Vérifier si la date est déjà sélectionnée
  const isDateAlreadySelected = selectedDate && selectedSessions.some(session =>
    session.date.toDateString() === selectedDate.toDateString()
  );

  // Gestionnaire pour ajouter une session
  const handleAddSession = () => {
    if (!selectedDate) return;

    // Validation du nombre d'heures
    if (hours < 1 || hours > 8) {
      setInputError("Le nombre d'heures doit être entre 1 et 8");
      return;
    }

    // Vérifier si la date est déjà sélectionnée
    if (isDateAlreadySelected) {
      setInputError("Cette date est déjà sélectionnée");
      return;
    }

    // Vérifier la disponibilité (simplifié - on pourrait faire une vérification plus poussée)
    const dayOfWeek = selectedDate.getDay();
    const apiDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const dayAvailability = availability.filter(slot => slot.day === apiDay);

    if (dayAvailability.length === 0) {
      setInputError("Aucun créneau disponible pour cette date");
      return;
    }

    // Calculer la durée totale disponible pour ce jour
    let totalMinutes = 0;
    dayAvailability.forEach(slot => {
      const start = new Date(`2000-01-01T${slot.start_hour}`);
      const end = new Date(`2000-01-01T${slot.end_hour}`);
      totalMinutes += (end - start) / (1000 * 60);
    });

    const requestedMinutes = hours * 60;
    if (requestedMinutes > totalMinutes) {
      setInputError(`Maximum ${Math.floor(totalMinutes / 60)}h disponibles pour cette date`);
      return;
    }

    // Ajouter la session
    onAddSession({
      date: selectedDate,
      hours: hours,
      dayOfWeek: apiDay
    });

    // Reset
    setHours(1);
    setInputError(null);
  };

  // Gestionnaire pour supprimer une session
  const handleRemoveSession = (dateToRemove) => {
    onAddSession(null, dateToRemove); // Passer null pour supprimer
  };


  const handleTimeSelect = (timeString) => {
    onSelectTime(timeString);
  };

  if (!selectedDate) {
    return (
      <div className="time-picker">
        <div className="time-picker-header">
          <h3>
            <Clock size={20} />
            Sélectionner une heure
          </h3>
          <p className="time-picker-info">Veuillez d'abord sélectionner une date</p>
        </div>
      </div>
    );
  }

  return (
    <div className="time-picker booking-component">
      <div className="time-picker-header">
        <h3>
          <Clock size={20} />
          Durée de tournage
        </h3>
        <p className="time-picker-info">
          {selectedDate
            ? `Nombre d'heures souhaité pour le ${selectedDate.toLocaleDateString('fr-FR')}`
            : "Sélectionnez d'abord une date dans le calendrier"
          }
        </p>
        {!selectedDate && (
          <div className="mobile-hint">
            <span className="hint-icon">👆</span>
            <span className="hint-text">Choisissez une date ci-dessus</span>
          </div>
        )}
      </div>

      {selectedDate && (
        <div className="hours-input-section">
          <div className="hours-input-group">
            <label htmlFor="hours-input">Nombre d'heures :</label>
            <div className="input-with-controls">
              <button
                type="button"
                className="hours-btn"
                onClick={() => setHours(Math.max(1, hours - 1))}
                disabled={hours <= 1}
              >
                -
              </button>
              <input
                id="hours-input"
                type="number"
                min="1"
                max="8"
                value={hours}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 1 && value <= 8) {
                    setHours(value);
                    setInputError(null);
                  }
                }}
                className="hours-input"
              />
              <button
                type="button"
                className="hours-btn"
                onClick={() => setHours(Math.min(8, hours + 1))}
                disabled={hours >= 8}
              >
                +
              </button>
            </div>
          </div>

          <button
            className="add-session-btn"
            onClick={handleAddSession}
            disabled={isDateAlreadySelected}
          >
            {isDateAlreadySelected ? 'Date déjà sélectionnée' : 'Ajouter cette session'}
          </button>

          {inputError && (
            <div className="input-error">
              {inputError}
            </div>
          )}
        </div>
      )}

      {selectedSessions && selectedSessions.length > 0 && (
        <div className="sessions-list">
          <h4>Sessions programmées :</h4>
          <div className="sessions-container">
            {selectedSessions.map((session, index) => (
              <div key={index} className="session-item">
                <div className="session-info">
                  <span className="session-date">
                    {session.date.toLocaleDateString('fr-FR')}
                  </span>
                  <span className="session-hours">
                    {session.hours}h de tournage
                  </span>
                </div>
                <button
                  className="remove-session-btn"
                  onClick={() => handleRemoveSession(session.date)}
                  title="Supprimer cette session"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="sessions-summary">
            <span className="summary-label">Total :</span>
            <span className="summary-value">
              {selectedSessions.length} session{selectedSessions.length > 1 ? 's' : ''} • {selectedSessions.reduce((total, session) => total + session.hours, 0)}h de tournage
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;