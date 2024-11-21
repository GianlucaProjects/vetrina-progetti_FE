// LoginComponent.js
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom"; // Importa useNavigate per il reindirizzamento

import "./LoginComponent.css";

const LoginComponent = () => {
  // Stato per i campi del form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Stato per la gestione degli errori di validazione
  const [errors, setErrors] = useState({});

  // Stato per gestire il caricamento
  const [isLoading, setIsLoading] = useState(false);

  // Stato per i messaggi di successo o errore dal server
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Hook per la navigazione
  const navigate = useNavigate();

  // Funzione di validazione del form
  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "L'email è richiesta.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email non valida.";
    }

    if (!password) {
      newErrors.password = "La password è richiesta.";
    } else if (password.length < 6) {
      newErrors.password = "La password deve avere almeno 6 caratteri.";
    }

    return newErrors;
  };

  // Funzione per gestire l'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          const { token } = data;

          // Salva il token nel localStorage
          localStorage.setItem("authToken", token);

          setSuccessMessage("Login effettuato con successo!");
          setEmail("");
          setPassword("");
          setErrors({});

          // Reindirizza l'utente alla dashboard o ad un'altra pagina
          navigate("/dashboard"); // Assicurati che la rotta /dashboard sia definita
        } else {
          setErrorMessage(data.message || "Email o password errati. Riprova.");
        }
      } catch (error) {
        console.error("Errore durante il login:", error);
        setErrorMessage("Si è verificato un errore. Riprova più tardi.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Form className="myForm p-5" id="main-container" onSubmit={handleSubmit}>
        {/* Messaggi di Successo */}
        {successMessage && (
          <Alert variant="success" className="text-center alert-custom">
            <i className="fas fa-check-circle me-2" aria-hidden="true"></i>
            {successMessage}
          </Alert>
        )}

        {/* Messaggi di Errore Generali */}
        {errorMessage && (
          <Alert variant="danger" className="text-center alert-custom">
            <i className="fas fa-exclamation-circle me-2" aria-hidden="true"></i>
            {errorMessage}
          </Alert>
        )}

        <h2 className="text-center mb-4">
          <strong>FAI IL LOGIN</strong>
        </h2>

        <Form.Group className="mb-4" controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <div className="input-icon">
            <i className="fas fa-envelope" aria-hidden="true"></i>
            <Form.Control
              type="email"
              placeholder="Inserisci la tua email"
              className={`input-field ${errors.email ? "is-invalid" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && (
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-4" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <div className="input-icon">
            <i className="fas fa-lock" aria-hidden="true"></i>
            <Form.Control
              type="password"
              placeholder="Inserisci la tua password"
              className={`input-field ${errors.password ? "is-invalid" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.password && (
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Caricamento...
              </>
            ) : (
              "LOGIN"
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default LoginComponent;
