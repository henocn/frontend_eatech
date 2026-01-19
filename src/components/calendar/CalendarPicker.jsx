import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import "./CalendarPicker.css";

const CalendarPicker = ({ selectedDate, onSelectDate, studioId, availability, selectedSessions = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDays, setAvailableDays] = useState(new Set());

  // Jours de la semaine (0 = lundi, 6 = dimanche)
  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  useEffect(() => {
    if (availability && availability.length > 0) {
      // Créer un set des jours disponibles (0-6)
      const days = new Set(availability.map(slot => slot.day));
      setAvailableDays(days);
    }
  }, [availability]);

  // Fonction pour vérifier si un jour est disponible
  const isDayAvailable = (date) => {
    const dayOfWeek = date.getDay(); // 0 = dimanche, 1 = lundi, etc.
    // Convertir en format API (0 = lundi, 6 = dimanche)
    const apiDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return availableDays.has(apiDay);
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
        isUnavailable: !isDayAvailable(date) || date <= new Date(new Date().setHours(23, 59, 59, 999)), // Indisponible = non disponible OU aujourd'hui inclus
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
      onSelectDate(dayInfo.date);
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