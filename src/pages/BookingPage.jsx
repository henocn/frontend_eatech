import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import StudioList from "../components/studios/StudioList";
import "../App.css";

const BookingPage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <StudioList />
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
