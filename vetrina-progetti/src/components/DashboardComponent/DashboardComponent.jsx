import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import './DashboardComponent.css';

const DashboardComponent = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:8080/projects", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      console.log(data.content);
      setProjects(data.content);
    };

    fetchProjects();
  }, []);

  const handleViewDetails = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleAddProject = () => {
    navigate("/projects/new");
  };

  return (
    <>
      <NavbarComponent />
      <Container className="mt-4">
        <h1>Benvenuto nella Dashboard!</h1>
        <Button variant="primary" className="mb-3" onClick={handleAddProject}>
          Aggiungi Nuovo Progetto
        </Button>
        {projects.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Titolo</th>
                <th>Descrizione</th>
                <th>Categoria</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{project.category}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => handleViewDetails(project.id)}
                    >
                      Dettagli
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Non ci sono progetti da visualizzare.</p>
        )}
      </Container>
    </>
  );
};

export default DashboardComponent;
