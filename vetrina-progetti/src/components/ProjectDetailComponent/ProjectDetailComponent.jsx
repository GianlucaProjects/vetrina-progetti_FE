import React, { useEffect, useState } from "react";
import { Container, Card, Button, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import FooterComponent from "../FooterComponent/FooterComponent";
import "./ProjectDetailComponent.css";

const ProjectDetailComponent = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      const authToken = sessionStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:8080/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setProject(data);
      setLoading(false);
    };

    fetchProject();
  }, [projectId]);

  return loading ? (
    <Container className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  ) : (
    <>
      <NavbarComponent />
      <Container className="mt-4 my-container">
        <Card>
          <Card.Body>
            <h1 className="text-center mb-4">{project.title}</h1>
            <p>
              <strong>
                <u>Descrizione</u>:
              </strong>{" "}
              {project.description}
            </p>
            <p>
              <strong>
                <u>Categoria</u>:
              </strong>{" "}
              {project.category}
            </p>
            {project.images && project.images.length > 0 && (
              <div className="project-images">
                <img
                  src={project.images[0]}
                  alt={`Project`}
                  className="img mb-3 justify-content-center"
                />
              </div>
            )}
            <div className="d-flex justify-content-center">
              <Button
                className="go-back "
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                Torna Indietro
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <FooterComponent />
    </>
  );
};

export default ProjectDetailComponent;
