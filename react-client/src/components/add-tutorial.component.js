import React, { useState } from "react";
import axios from "axios";

export default function AddItinerary() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [submittedPlan, setSubmittedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const saveItinerary = async (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    
    setLoading(true);
    setValidationError("");
    setSubmittedPlan(null);

    // --- JAVASCRIPT VALIDATION ---
    // 1. Check if the user only typed empty spaces
    if (!destination.trim()) {
      setValidationError("Destination cannot be empty or just spaces.");
      setLoading(false);
      return;
    }

    // 2. Parse and validate the numeric day range manually
    const numericDays = parseInt(days, 10);
    if (isNaN(numericDays) || numericDays < 1 || numericDays > 30) {
      setValidationError("Please enter a valid number of days between 1 and 30.");
      setLoading(false);
      return;
    }

    // Form data mapped to match the backend columns perfectly
    const data = {
      title: destination.trim(),
      description: days
    };

    try {
      // Connects to your running Express backend route
      const response = await axios.post("http://localhost:8080/api/tutorials", data);
      setSubmittedPlan(response.data);
    } catch (error) {
      console.error("Error generating trip:", error);
      setValidationError("Failed to connect to the backend server or AI API.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDestination("");
    setDays("");
    setSubmittedPlan(null);
    setValidationError("");
  };

  return (
    <div className="submit-form" style={{ maxWidth: "700px", margin: "30px auto", padding: "0 15px" }}>
      
      {/* Alert Banner for Input Failures */}
      {validationError && (
        <div className="alert alert-danger" role="alert">
          ⚠️ {validationError}
        </div>
      )}

      {submittedPlan ? (
        <div>
          <div className="alert alert-success">🎒 Successfully generated and saved to database!</div>
          
          <div style={{ background: "#f8f9fa", padding: "25px", borderRadius: "8px", border: "1px solid #dee2e6", marginTop: "15px", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
            <h3 style={{ textTransform: "capitalize", color: "#007bff", marginBottom: "15px" }}>📍 Itinerary to {submittedPlan.title}</h3>
            <hr />
            {/* pre-wrap preserves line breaks and spacing coming out of the database column */}
            <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6", color: "#333", fontSize: "15px" }}>
              {submittedPlan.description}
            </p>
          </div>

          <button className="btn btn-primary btn-block" style={{ marginTop: "20px", fontWeight: "600" }} onClick={resetForm}>
            Plan Another New Trip
          </button>
        </div>
      ) : (
        <form onSubmit={saveItinerary} style={{ padding: "30px", border: "1px solid #dee2e6", borderRadius: "8px", background: "#ffffff", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ marginBottom: "25px", textAlign: "center", color: "#495057" }}>🗺️ AI Travel Itinerary Generator</h3>
          
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label htmlFor="destination" style={{ fontWeight: "600", color: "#495057" }}>Where do you want to go?</label>
            <input
              type="text"
              className="form-control"
              id="destination"
              required /* HTML5 browser protection */
              disabled={loading} /* Locks input during active API calls */
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g., Paris, Tokyo, Bali"
            />
          </div>

          <div className="form-group" style={{ marginBottom: "25px" }}>
            <label htmlFor="days" style={{ fontWeight: "600", color: "#495057" }}>Number of Days</label>
            <input
              type="number"
              className="form-control"
              id="days"
              required /* HTML5 browser protection */
              min="1"    /* Blocks submission lower than 1 day */
              max="30"   /* Prevents extreme query lengths */
              disabled={loading}
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="e.g., 3, 5, 7"
            />
          </div>

          {/* Button switches layout dynamically when loading is active */}
          <button type="submit" className="btn btn-success btn-block" disabled={loading} style={{ padding: "12px", fontSize: "16px", fontWeight: "600" }}>
            {loading ? (
              <span>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: "10px" }}></span>
                🤖 AI is planning your trip (Please wait)...
              </span>
            ) : (
              "Generate Itinerary"
            )}
          </button>
        </form>
      )}
    </div>
  );
}