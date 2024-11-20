import React from "react";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import "./LoginComponent.css";

const LoginComponent = () => {
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center mb-3">
      <Form className="myForm pb-5 mb-5" id="main-container">
        <div className="pb-5">
          <h2 className="text-center">
            <strong>REGISTRATI</strong>
          </h2>

          <div id="input-fields">
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Indirizzo email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <div class="cerchio"></div>
            </div>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default LoginComponent;
