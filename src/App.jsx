import { useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookingPage from "./pages/BookingPage";
import "./App.css";
import Login from "./pages/Login";
// import Register from "./components/Register";

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/auth/login" element={<Login />} />
            {/* <Route path="/auth/register" element={<Register />} /> */}
          </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
