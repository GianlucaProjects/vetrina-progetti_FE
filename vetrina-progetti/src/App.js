// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import SignUpComponent from "./components/SignUpComponent/SignUpComponent";
import DashboardComponent from "./components/DashboardComponent/DashboardComponent";
import ProjectFormComponent from "./components/ProjectFormComponent/ProjectFormComponent"; 
import ProjectDetailComponent from "./components/ProjectDetailComponent/ProjectDetailComponent";
import PrivateRoute from "./components/PrivateRoute"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SupportComponent from "./components/SupportComponent/SupportComponent";
import ProfileComponent from "./components/ProfileComponent/ProfileComponent";

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
          path="/support"
          element={
            <PrivateRoute>
              <SupportComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <ProfileComponent />
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
        <Route
          path="/projects/:projectId"
          element={
            <PrivateRoute>
              <ProjectDetailComponent />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
