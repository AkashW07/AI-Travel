import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddItinerary from "./components/add-tutorial.component"; // Your Step 1 Form
import TutorialsList from "./components/tutorials-list.component"; // Your Step 2 History

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/tutorials"} className="navbar-brand" style={{ paddingLeft: "15px" }}>
            🌍 SmartTravel AI
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                History Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                ✨ Plan New Trip
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TutorialsList />} />
            <Route path="/tutorials" element={<TutorialsList />} />
            <Route path="/add" element={<AddItinerary />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;