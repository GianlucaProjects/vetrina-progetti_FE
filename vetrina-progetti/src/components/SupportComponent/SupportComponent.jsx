import React, { useState, useEffect } from "react";
import { Form, Container, Button, Alert, Spinner } from "react-bootstrap";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import { useNavigate } from "react-router-dom";
import './SupportComponent.css';

const SupportComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const authToken = sessionStorage.getItem("authToken");

    try {
      const response = await fetch("http://localhost:8080/tickets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        setSuccessMessage("Ticket inviato con successo!");
        setTitle("");
        setDescription("");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Errore durante l'invio del ticket:", error);
      setErrorMessage("Si è verificato un errore. Riprova più tardi.");
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <Container className="mt-4">
        <h1 className="text-center mb-4">Supporto</h1>
        <p className="text-center"><em>Qui puoi inviare un ticket di supporto!</em></p>
        {successMessage && (
          <Alert variant="success" className="text-center">
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert variant="danger" className="text-center">
            {errorMessage}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Titolo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il titolo del ticket"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Inserisci la descrizione del ticket"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" className="support-button" type="submit" disabled={isLoading}>
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
                "Invia Ticket"
              )}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default SupportComponent;
