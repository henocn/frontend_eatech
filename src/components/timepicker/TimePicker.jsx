import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import "./TimePicker.css";

const TimePicker = ({ selectedDate, selectedTimeRange, onSelectTimeRange, availability }) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);

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
            fullTime: currentTime,
            isSelected: isTimeInRange(timeString, selectedTimeRange),
            isInDragRange: isTimeInRange(timeString, { start: dragStart, end: dragEnd })
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
  }, [selectedDate, availability, selectedTimeRange, dragStart, dragEnd]);

  // Vérifier si une heure est dans une plage
  const isTimeInRange = (time, range) => {
    if (!range || !range.start || !range.end) return false;

    const timeDate = new Date(`2000-01-01T${time}`);
    const startDate = new Date(`2000-01-01T${range.start}`);
    const endDate = new Date(`2000-01-01T${range.end}`);

    return timeDate >= startDate && timeDate <= endDate;
  };

  // Gestion du drag pour sélectionner une plage
  const handleMouseDown = (time) => {
    setIsDragging(true);
    setDragStart(time);
    setDragEnd(time);
  };

  const handleMouseEnter = (time) => {
    if (isDragging) {
      setDragEnd(time);
    }
  };

  const handleMouseUp = () => {
    if (isDragging && dragStart && dragEnd) {
      // Déterminer le début et la fin de la plage
      const start = dragStart <= dragEnd ? dragStart : dragEnd;
      const end = dragStart <= dragEnd ? dragEnd : dragStart;

      onSelectTimeRange({ start, end });
    }

    setIsDragging(false);
    setDragStart(null);
    setDragEnd(null);
  };

  // Annuler le drag si on sort du composant
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragStart(null);
      setDragEnd(null);
    }
  };

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
    <div className="time-picker" onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp}>
      <div className="time-picker-header">
        <h3>
          <Clock size={20} />
          Sélectionner une plage horaire
        </h3>
        <p className="time-picker-info">
          Glissez pour sélectionner le début et la fin de votre réservation pour le {selectedDate.toLocaleDateString('fr-FR')}
        </p>
      </div>

      <div className="time-slots">
        {availableSlots.length > 0 ? (
          availableSlots.map((slot) => (
            <div
              key={slot.time}
              className={`time-slot ${
                slot.isSelected ? 'selected' :
                slot.isInDragRange ? 'in-drag-range' :
                ''
              }`}
              onMouseDown={() => handleMouseDown(slot.time)}
              onMouseEnter={() => handleMouseEnter(slot.time)}
            >
              {slot.displayTime}
            </div>
          ))
        ) : (
          <div className="no-slots">
            <Clock size={24} />
            <p>Aucun créneau disponible pour cette date</p>
          </div>
        )}
      </div>

      {selectedTimeRange && selectedTimeRange.start && selectedTimeRange.end && (
        <div className="selected-time-info">
          <span className="selected-label">Plage sélectionnée :</span>
          <span className="selected-value">
            {formatTimeDisplay(selectedTimeRange.start)} - {formatTimeDisplay(selectedTimeRange.end)}
          </span>
        </div>
      )}

      {isDragging && (
        <div className="drag-instruction">
          Relâchez pour confirmer la sélection
        </div>
      )}
    </div>
  );
};

export default TimePicker;