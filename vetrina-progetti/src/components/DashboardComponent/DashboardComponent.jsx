import React, { useEffect, useState } from "react";
import { Table, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import Alert from 'react-bootstrap/Alert';
import "./DashboardComponent.css";

const DashboardComponent = () => {
  const [projects, setProjects] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const authToken = sessionStorage.getItem("authToken");
      const response = await fetch("http://localhost:8080/projects", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      if (data.status === 500) {
        navigate("/login");
      } else {
        setProjects(data.content);
      }
    };

    fetchProjects();
  }, [navigate]);

  const handleViewDetails = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleDeleting = (projectId) => {
    const authToken = sessionStorage.getItem("authToken");

    fetch(`http://localhost:8080/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((data) => {
        if (data.status === 200) {
          console.log("Progetto eliminato con successo:", data);
          setProjects(projects.filter((project) => project.id !== projectId));
          setSuccessMessage("Progetto eliminato con successo!");
          setTimeout(() => setSuccessMessage(""), 5000);
        } else if (data.status === 500) {
          navigate("/login");
        } else {
          console.error(
            "Errore durante l'eliminazione del progetto:",
            data.message
          );
        }
      })
      .catch((error) =>
        console.error("Errore durante l'eliminazione del progetto:", error)
      );
  };

  const handleAddProject = () => {
    navigate("/projects/new");
  };

  return (
    <>
      <NavbarComponent />
      {successMessage && (
        <Alert variant="success" className="alert-text mt-3">{successMessage}</Alert>
      )}
      <Container className="mt-3 d-flex flex-column align-items-center">
        <h1 className="text-center mb-4">Benvenuto nella Dashboard!</h1>
        {projects.length > 0 ? (
          <Card className="my-table d-flex justify-content-center w-100">
            <Card.Body>
              <Table responsive bordered hover className="mb-0">
                <thead className="thead-dark">
                  <tr>
                    <th className="text-center">Titolo</th>
                    <th className="text-center">Descrizione</th>
                    <th className="text-center">Categoria</th>
                    <th className="text-center" colSpan={2}>
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td className="text-center">{project.title}</td>
                      <td className="text-center">{project.description}</td>
                      <td className="text-center">{project.category}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          className="me-2 detail-button"
                          onClick={() => handleViewDetails(project.id)}
                        >
                          Dettagli
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          className="me-2"
                          onClick={() => handleDeleting(project.id)}
                        >
                          Elimina
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        ) : (
          <p className="text-center">Non ci sono progetti da visualizzare.</p>
        )}
        <div className="d-flex justify-content-center mb-3">
          <Button className="add-project mt-3" onClick={handleAddProject}>
            Aggiungi Nuovo Progetto
          </Button>
        </div>
      </Container>
    </>
  );
};

export default DashboardComponent;
