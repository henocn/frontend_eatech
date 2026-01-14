import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import "./TimePicker.css";

const TimePicker = ({ selectedDate, selectedTime, onSelectTime, availability }) => {
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    if (selectedDate && availability && availability.length > 0) {
      // Convertir la date sélectionnée en jour de la semaine (0-6)
      const dayOfWeek = selectedDate.getDay(); // 0 = dimanche, 1 = lundi, etc.
      const apiDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convertir en format API

      // Filtrer les créneaux pour ce jour
      const daySlots = availability.filter(slot => slot.day === apiDay);

      // Générer tous les créneaux de 30 minutes entre start_hour et end_hour
      const slots = [];
      daySlots.forEach(slot => {
        const startTime = new Date(`2000-01-01T${slot.start_hour}`);
        const endTime = new Date(`2000-01-01T${slot.end_hour}`);

        let currentTime = new Date(startTime);

        while (currentTime < endTime) {
          const timeString = currentTime.toTimeString().slice(0, 5); // HH:MM format
          slots.push({
            time: timeString,
            displayTime: formatTimeDisplay(timeString),
            isSelected: selectedTime === timeString
          });

          // Ajouter 30 minutes
          currentTime.setMinutes(currentTime.getMinutes() + 30);
        }
      });

      // Trier et supprimer les doublons
      const uniqueSlots = slots
        .filter((slot, index, self) =>
          index === self.findIndex(s => s.time === slot.time)
        )
        .sort((a, b) => a.time.localeCompare(b.time));

      setAvailableSlots(uniqueSlots);
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, availability, selectedTime]);

  const formatTimeDisplay = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
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
    <div className="time-picker">
      <div className="time-picker-header">
        <h3>
          <Clock size={20} />
          Sélectionner une heure
        </h3>
        <p className="time-picker-info">
          Créneaux disponibles pour le {selectedDate.toLocaleDateString('fr-FR')}
        </p>
      </div>

      <div className="time-slots">
        {availableSlots.length > 0 ? (
          availableSlots.map((slot) => (
            <button
              key={slot.time}
              className={`time-slot ${slot.isSelected ? 'selected' : ''}`}
              onClick={() => handleTimeSelect(slot.time)}
            >
              {slot.displayTime}
            </button>
          ))
        ) : (
          <div className="no-slots">
            <Clock size={24} />
            <p>Aucun créneau disponible pour cette date</p>
          </div>
        )}
      </div>

      {selectedTime && (
        <div className="selected-time-info">
          <span className="selected-label">Heure sélectionnée :</span>
          <span className="selected-value">
            {availableSlots.find(slot => slot.time === selectedTime)?.displayTime}
          </span>
        </div>
      )}
    </div>
  );
};

export default TimePicker;