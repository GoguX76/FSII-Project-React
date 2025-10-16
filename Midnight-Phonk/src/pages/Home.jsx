import React from 'react';
import '../css/home.css';
import logo from "../assets/images/midnight-phonk.png"; 

function Home() {
  return (
    <div className="home-container">
      <header className="main-header">
        <img src={logo} alt="Midnight Phonk Logo" className="logo" />
        <p className="tagline">Donde nace el próximo himno del Phonk</p>
      </header>
    </div>
  );
}

export default Home;