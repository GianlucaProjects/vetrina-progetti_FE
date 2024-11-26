import React, { useState } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import './ProjectFormComponent.css';

const ProjectFormComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const authToken = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    try {
      const response = await fetch("http://localhost:8080/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("Progetto aggiunto con successo!");
        setTitle("");
        setDescription("");
        setCategory("");
        setImages([]);
        navigate("/dashboard");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Errore durante l'aggiunta del progetto. Riprova!");
      }
    } catch (error) {
      console.error("Errore durante l'aggiunta del progetto:", error);
      setErrorMessage("Si è verificato un errore. Riprova più tardi.");
    }
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  return (
    <>
      <NavbarComponent />
      <Container className="mt-4">
        <h1>Aggiungi Nuovo Progetto</h1>
        {errorMessage && (
          <Alert variant="danger" className="text-center">
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert variant="success" className="text-center">
            {successMessage}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Titolo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il titolo del progetto"
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
              placeholder="Inserisci la descrizione del progetto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci la categoria del progetto"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImages">
            <Form.Label>Immagini</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleImageChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Aggiungi Progetto
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ProjectFormComponent;