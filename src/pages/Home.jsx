import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/hero/Hero";
import Services from "../components/services/Services";
import DecorsSection from "../components/decorsPublic/DecorsSection";
import Portfolio from "../components/portfolio/Portfolio";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import BookingButton from "../components/BookingButton";
import "../App.css";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    // Si on vient de cliquer sur "Services" depuis une autre page
    if (location.state?.scrollToServices) {
      // Attendre que le DOM soit complètement rendu
      setTimeout(() => {
        const element = document.getElementById('services');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Services />
        <DecorsSection />
        <Portfolio />
      </main>
      <BookingButton />
      <Footer />
    </div>
  );
};

export default Home;
