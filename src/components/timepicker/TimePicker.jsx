import { useState } from "react";
import { Clock } from "lucide-react";
import "./TimePicker.css";

const TimePicker = ({ selectedDate, selectedSessions, onAddSession }) => {
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

    // Ajouter la session
    onAddSession({
      date: selectedDate,
      hours: hours
    });

    // Reset
    setHours(1);
    setInputError(null);
  };

  // Gestionnaire pour supprimer une session
  const handleRemoveSession = (dateToRemove) => {
    onAddSession(null, dateToRemove); // Passer null pour supprimer
  };

  // Si pas de date sélectionnée ET pas de sessions, afficher seulement le header
  const showOnlyHeader = !selectedDate && (!selectedSessions || selectedSessions.length === 0);

  if (showOnlyHeader) {
    return (
      <div className="time-picker">
        <div className="time-picker-header">
          <h3>
            <Clock size={20} />
            Durée de tournage
          </h3>
          <p className="time-picker-info">
            Sélectionnez d'abord une date dans le calendrier
          </p>
          {!selectedDate && (
            <div className="mobile-hint">
              <span className="hint-icon">👆</span>
              <span className="hint-text">Choisissez une date ci-dessus</span>
            </div>
          )}
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
            : "Sélectionnez une date dans le calendrier pour ajouter une session"
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
            <label htmlFor="hours-input">
              Nombre d'heures :
            </label>
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