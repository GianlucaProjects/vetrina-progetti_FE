// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import SignUpComponent from "./components/SignUpComponent/SignUpComponent";
import DashboardComponent from "./components/DashboardComponent/DashboardComponent";
import ProjectFormComponent from "./components/ProjectFormComponent/ProjectFormComponent"; // Importa il componente ProjectFormComponent
import PrivateRoute from "./components/PrivateRoute"; // Importa il componente PrivateRoute
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects/new"
          element={
            <PrivateRoute>
              <ProjectFormComponent />
            </PrivateRoute>
          }
        />
        {/* Aggiungi altre rotte come necessario */}
      </Routes>
    </Router>
  );
};

export default App;
