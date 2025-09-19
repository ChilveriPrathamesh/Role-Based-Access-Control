import React, { Component } from "react";
import { API_URL_USERS, API_URL } from "../../config";
import './index.css';
import Navbar from "../Navbar";

class AssignCandidate extends Component {
  state = {
    candidates: [],
    hiringManagers: [],
    selectedCandidate: "",
    selectedHR: "",
  };

  componentDidMount() {
    this.fetchCandidates();
    this.fetchHiringManagers();
  }

  // Fetch all candidates
  fetchCandidates = async () => {
    try {
      const res = await fetch(`${API_URL}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      this.setState({ candidates: Array.isArray(data) ? data : [] });
    } catch (err) {
      console.error("Error fetching candidates:", err);
    }
  };

  // Fetch all HR / Hiring Managers
  fetchHiringManagers = async () => {
    try {
      const res = await fetch(`${API_URL_USERS}/users?role=Hiring Manager`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      this.setState({ hiringManagers: Array.isArray(data) ? data : [] });
    } catch (err) {
      console.error("Error fetching hiring managers:", err);
    }
  };

  // Assign candidate to HR
  handleAssign = async () => {
    const { selectedCandidate, selectedHR } = this.state;
    if (!selectedCandidate || !selectedHR) return alert("Select candidate and HR");

    try {
      const res = await fetch(`${API_URL}/${selectedCandidate}/assign`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ assigned_to: selectedHR }),
                });


      if (!res.ok) throw new Error(`Failed to assign: ${res.status}`);
      alert("Candidate assigned successfully!");
      this.setState({ selectedCandidate: "", selectedHR: "" });
    } catch (err) {
      console.error("Error assigning candidate:", err);
      alert("Failed to assign candidate. See console for details.");
    }
  };

  render() {
    const { candidates, hiringManagers, selectedCandidate, selectedHR } = this.state;

    return (
      <>
        <Navbar />
        <div className="assign-candidate-container">
          <h1 className="assign-candidate-title">Assign Candidate to HR</h1>

          <div className="assign-candidate-field">
            <label className="assign-candidate-label">Candidate:</label>
            <select
              className="assign-candidate-select"
              value={selectedCandidate}
              onChange={(e) => this.setState({ selectedCandidate: e.target.value })}
            >
              <option value="">--Select Candidate--</option>
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name || c.email}
                </option>
              ))}
            </select>
          </div>

          <div className="assign-candidate-field">
            <label className="assign-candidate-label">Hiring Manager:</label>
            <select
              className="assign-candidate-select"
              value={selectedHR}
              onChange={(e) => this.setState({ selectedHR: e.target.value })}
            >
              <option value="">--Select HR--</option>
              {hiringManagers.map((hr) => (
                <option key={hr.id} value={hr.id}>
                  {hr.email}
                </option>
              ))}
            </select>
          </div>

          <button className="assign-candidate-button" onClick={this.handleAssign}>
            Assign
          </button>
        </div>
      </>
    );
  }
}

export default AssignCandidate;
