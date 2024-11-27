import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

import "./SignUpComponent.css";

const SignUpComponent = () => {
  // Stato per i campi del form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Stato per la gestione degli errori di validazione
  const [errors, setErrors] = useState({});

  // Stato per gestire il caricamento
  const [isLoading, setIsLoading] = useState(false);

  // Stato per i messaggi di successo o errore dal server
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Funzione di validazione del form
  const validate = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = "Il nome è richiesto.";
    }

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
        const response = await fetch("http://localhost:8080/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          const { name } = data.name;
          localStorage.setItem("name", name);
          
          setSuccessMessage("Registrazione effettuata con successo!");
          setName("");
          setEmail("");
          setPassword("");
          setErrors({});

          navigate("/dashboard");
        } else {
          setErrorMessage(data.message || "Errore durante la registrazione. Riprova!");
        }
      } catch (error) {
        console.error("Errore durante la registrazione:", error);
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
      <Form className="myForm p-5" onSubmit={handleSubmit}>
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
          <strong>REGISTRATI</strong>
        </h2>

        <Form.Group className="mb-4" controlId="formGroupName">
          <Form.Label>Nome</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-user" aria-hidden="true"></i>
            </span>
            <Form.Control
              type="text"
              placeholder="Inserisci il tuo nome"
              className={`input-field ${errors.name ? "is-invalid" : ""}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {errors.name && (
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-4" controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-envelope" aria-hidden="true"></i>
            </span>
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
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-lock" aria-hidden="true"></i>
            </span>
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
          <Button type="submit" className="signup-button" disabled={isLoading}>
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
              "REGISTRATI"
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default SignUpComponent;