import React from "react";
import Hero from "../components/hero/Hero";
import Services from "../components/services/Services";
import Portfolio from "../components/portfolio/Portfolio";
import PhotographySets from "../components/photographysets/PhotographySets";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import BookingButton from "../components/BookingButton";
import "../App.css";

const Home = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Services />
        {/* <PhotographySets /> */}
        <Portfolio />
      </main>
      <BookingButton />
      <Footer />
    </div>
  );
};

export default Home;
