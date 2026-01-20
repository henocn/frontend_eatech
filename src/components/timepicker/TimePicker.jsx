import { useState, useEffect } from "react";
import { Clock, Plus, ShoppingCart } from "lucide-react";
import "./TimePicker.css";

const TimePicker = ({ selectedDate, selectedSessions, onAddSession, selectedDecor, onAddToCart }) => {
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [inputError, setInputError] = useState(null);

  // Vérifier si la date est déjà sélectionnée
  const isDateAlreadySelected = selectedDate && selectedSessions.some(session =>
    session.date.toDateString() === selectedDate.toDateString()
  );

  // Charger les valeurs de start/end time si la date a déjà une session
  useEffect(() => {
    if (selectedDate && isDateAlreadySelected) {
      const existingSession = selectedSessions.find(session =>
        session.date.toDateString() === selectedDate.toDateString()
      );
      if (existingSession) {
        setStartTime(existingSession.startTime);
        setEndTime(existingSession.endTime);
      }
    }
  }, [selectedDate, isDateAlreadySelected, selectedSessions]);

  // Calculer le nombre d'heures entre les deux horaires
  const calculateHours = () => {
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    return (endMinutes - startMinutes) / 60;
  };

  const hours = calculateHours();

  // Générer les heures disponibles (8:00 à 18:00)
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 8; hour <= 18; hour++) {
      options.push(`${String(hour).padStart(2, "0")}:00`);
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  // Gestionnaire pour ajouter une session
  const handleAddSession = () => {
    if (!selectedDate) return;

    // Vérifier que l'heure de fin est après l'heure de début
    if (startTime >= endTime) {
      setInputError("L'heure de fin doit être après l'heure de début");
      return;
    }

    // Si la date a déjà une session, la supprimer d'abord
    if (isDateAlreadySelected) {
      onAddSession(null, selectedDate);
    }

    // Ajouter la nouvelle session (ou mettre à jour si date existante)
    onAddSession({
      date: selectedDate,
      startTime: startTime,
      endTime: endTime,
      hours: hours
    });

    // Reset
    setStartTime("08:00");
    setEndTime("09:00");
    setInputError(null);
  };

  // Gestionnaire pour supprimer une session
  const handleRemoveSession = (dateToRemove) => {
    onAddSession(null, dateToRemove);
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
          <div className="time-inputs-group">
            <label htmlFor="plage-time">Plage</label>
            <div className="duration-display">
              <span className="duration-label">Durée :</span>
              <span className="duration-value">
                {hours > 0 ? `${hours.toFixed(1)}h` : "Invalide"}
              </span>
            </div>
          </div>

          <div className="time-range-container">
            <select
              id="plage-time"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                setInputError(null);
              }}
              className="time-select"
            >
              {timeOptions.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            
            <span className="time-separator">à</span>
            
            <select
              id="end-time"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                setInputError(null);
              }}
              className="time-select"
            >
              {timeOptions.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <button
            className="add-session-btn"
            onClick={handleAddSession}
            disabled={hours <= 0}
          >
            <Plus size={18} />
            <span>Valider</span>
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

          {onAddToCart && (
            <button
              className="add-to-cart-btn"
              onClick={() => {
                selectedSessions.forEach(session => {
                  onAddToCart(session);
                });
              }}
            >
              <ShoppingCart size={18} />
              <span>Ajouter au panier</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TimePicker;