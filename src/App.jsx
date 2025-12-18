import { useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookingPage from "./pages/BookingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookingButton from "./components/BookingButton";
import "./App.css";

/**
 * Composant principal de l'application
 */
function App() {
  useEffect(() => {
    // Animation au chargement de la page
    document.body.classList.add("fade-in");

    return () => {
      document.body.classList.remove("fade-in");
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
