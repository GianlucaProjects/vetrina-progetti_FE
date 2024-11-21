// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import DashboardComponent from "./components/DashboardComponent/DashboardComponent";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/dashboard" element={<DashboardComponent />} />
        {/* Aggiungi altre rotte come necessario */}
      </Routes>
    </Router>
  );
};

export default App;
