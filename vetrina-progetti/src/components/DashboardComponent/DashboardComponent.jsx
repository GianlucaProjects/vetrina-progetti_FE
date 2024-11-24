// DashboardComponent.js
import React from "react";
import NavbarComponent from "../NavbarComponent/NavbarComponent"; // Assicurati che il percorso sia corretto
import './DashboardComponent.css';

const DashboardComponent = () => {
  return (
    <>
      <NavbarComponent />
      <div className="dashboard-container">
        <h1>Benvenuto nella Dashboard!</h1>
      </div>
    </>
  );
};

export default DashboardComponent;
