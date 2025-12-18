import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingButton from "../components/BookingButton";
import "../App.css";

const Home = () => {
  return (
    <>
      <Header current="home" />
      <main>
        <Hero />
        <Services />
        <Portfolio />
      </main>
      <BookingButton />
      <Footer />
    </>
  );
};

export default Home;
