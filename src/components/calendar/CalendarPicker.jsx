import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import "./CalendarPicker.css";

const CalendarPicker = ({ selectedDate, onSelectDate, studioId, availability, selectedSessions = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Jours de la semaine (0 = lundi, 6 = dimanche)
  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  // Fonction pour vérifier si un jour est disponible (lundi à samedi, exclut date actuelle et passée)
  const isDayAvailable = (date) => {
    const dayOfWeek = date.getDay(); // 0 = dimanche, 1 = lundi, ..., 6 = samedi
    
    // Vérifier si c'est lundi (1) à samedi (6), exclure dimanche (0)
    if (dayOfWeek === 0) return false;
    
    // Vérifier si la date n'est pas dans le passé et n'est pas aujourd'hui
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    if (checkDate <= today) return false;
    
    return true;
  };

  // Générer les jours du mois
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const days = [];

    // Jours vides du début
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Convertir dimanche=0 en dimanche=6
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const hasSession = selectedSessions.some(session =>
        session.date.toDateString() === date.toDateString()
      );

      days.push({
        date,
        day,
        isAvailable: isDayAvailable(date),
        isToday: date.toDateString() === new Date().toDateString(),
        isSelected: selectedDate && date.toDateString() === selectedDate.toDateString(),
        isPast: date < new Date(new Date().setHours(0, 0, 0, 0)), // Date dans le passé
        isUnavailable: !isDayAvailable(date),
        hasSession: hasSession
      });
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const handleDateSelect = (dayInfo) => {
    if (dayInfo && !dayInfo.isUnavailable) {
      // Si on clique sur la date déjà sélectionnée, on la désélectionne
      if (selectedDate && dayInfo.date.toDateString() === selectedDate.toDateString()) {
        onSelectDate(null);
      } else {
        onSelectDate(dayInfo.date);
      }
    }
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  return (
    <div className="calendar-picker booking-component">
      <div className="calendar-header">
        <h3>
          <Calendar size={20} />
          Sélectionner une date
        </h3>
      </div>

      <div className="calendar-navigation">
        <button
          onClick={() => navigateMonth(-1)}
          className="calendar-nav-btn"
          disabled={currentMonth.getMonth() === new Date().getMonth() &&
                   currentMonth.getFullYear() === new Date().getFullYear()}
        >
          <ChevronLeft size={18} />
        </button>

        <div className="calendar-month">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>

        <button onClick={() => navigateMonth(1)} className="calendar-nav-btn">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="calendar-grid">
        {/* Jours de la semaine */}
        {weekDays.map((day, index) => (
          <div key={index} className="calendar-weekday">
            {day}
          </div>
        ))}

        {/* Jours du mois */}
        {days.map((dayInfo, index) => (
          <div
            key={index}
            className={`calendar-day ${dayInfo ? 'calendar-day-filled' : ''} ${
              dayInfo?.isSelected ? 'selected' :
              dayInfo?.hasSession ? 'has-session' :
              dayInfo?.isToday ? 'today' : ''
            } ${
              dayInfo?.isUnavailable ? 'unavailable' : 'available'
            }`}
            onClick={() => handleDateSelect(dayInfo)}
          >
            {dayInfo?.day}
          </div>
        ))}
      </div>

      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-color selected"></div>
          <span>En cours de sélection</span>
        </div>
        <div className="legend-item">
          <div className="legend-color has-session"></div>
          <span>Session programmée</span>
        </div>
        <div className="legend-item">
          <div className="legend-color unavailable"></div>
          <span>Indisponible</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarPicker;