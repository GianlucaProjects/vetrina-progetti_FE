import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import FooterComponent from "../FooterComponent/FooterComponent";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./ProfileComponent.css";

const ProfileComponent = () => {
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = sessionStorage.getItem("authToken");
    try {
      const response = await fetch("http://localhost:8080/api/password/change", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if(data.status === 500){
        navigate("/login");
      }
      else if(response.ok) {
        setSuccessMessage("Password cambiata con successo!");
        setTimeout(() => setSuccessMessage(""), 5000);
      }
    } catch (error) {
      console.error("Errore di rete:", error);
    }
  };

  return (
    <>
      <NavbarComponent />
      {successMessage && (
        <Alert variant="success" className="alert-text mt-3">
          {successMessage}
        </Alert>
      )}
      <div className="profile-container mt-3 d-flex">
        <h2>Pagina Profilo</h2>
        <p className="mb-3 justify-content-center">
          <em>
            In questa sezione potrai cambiare la password del tuo account!
          </em>
        </p>
        <form onSubmit={handleSubmit} className="password-form mt-3">
          <input
            type="password"
            id="password"
            placeholder="Inserisci la nuova password!"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="button-div">
            <Button type="submit" className="btn align-center">
              Cambia Password
            </Button>
          </div>
        </form>
      </div>
      <FooterComponent />
    </>
  );
};

export default ProfileComponent;
