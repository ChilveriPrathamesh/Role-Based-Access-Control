import React, { Component } from "react";
import "./index.css";
import { API_URL } from "../../config";
import Navbar from "../Navbar";
import withRouter from "../withRouter";

class CandidateForm extends Component {
  state = {
    id: null,
    name: "",
    email: "",
    phone_number: "",
    current_status: "",
    resume_link: "",
    error: "",
    success: "",
  };

  componentDidMount() {
    const { id } = this.props.params;
    if (id) {
      this.setState({ id }, this.fetchCandidate);
    }
  }

  fetchCandidate = async () => {
    try {
      const { id } = this.state;
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Failed to fetch candidate");
      const data = await res.json();
      this.setState({
        name: data.name || "",
        email: data.email || "",
        phone_number: data.phone_number || "",
        current_status: data.current_status || "",
        resume_link: data.resume_link || "",
        error: "",
      });
    } catch (err) {
      this.setState({ error: err.message || "Error loading candidate" });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: "", success: "" });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { id, name, email, phone_number, current_status, resume_link } = this.state;

    // Only send required fields to backend
    const candidate = { name, email, phone_number, current_status, resume_link };

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidate),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error || "Failed to save candidate");
      }

      this.setState({
        success: id ? "Candidate updated successfully." : "Candidate added successfully.",
        error: "",
      });

      setTimeout(() => {
        this.props.navigate("/candidatelist");
      }, 500);
    } catch (error) {
      this.setState({
        error: error.message || "Error saving form",
        success: "",
      });
    }
  };

  render() {
    const { id, name, email, phone_number, current_status, resume_link, error, success } = this.state;

    return (
      <>
        <Navbar />
        <div className="candidate-form-container">
          <h1 className="candidate-form-title">{id ? "Edit Candidate" : "Add Candidate"}</h1>

          {success && <p className="success-message">{success}</p>}
          {error && <p className="error-message">{error}</p>}

          <form className="candidate-form" onSubmit={this.handleSubmit}>
            <label htmlFor="name" className="candidate-form-label">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="candidate-form-input"
              placeholder="Enter full name"
              value={name}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="email" className="candidate-form-label">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="candidate-form-input"
              placeholder="Enter email"
              value={email}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="phone_number" className="candidate-form-label">Phone Number</label>
            <input
              id="phone_number"
              type="text"
              name="phone_number"
              className="candidate-form-input"
              placeholder="Enter phone number"
              value={phone_number}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="current_status" className="candidate-form-label">Current Status</label>
            <input
              id="current_status"
              name="current_status"
              className="candidate-form-input"
              value={current_status}
              onChange={this.handleChange}
              placeholder="Enter current status"
              required
            />

            <label htmlFor="resume_link" className="candidate-form-label">Resume URL</label>
            <input
              id="resume_link"
              type="url"
              name="resume_link"
              className="candidate-form-input"
              placeholder="Enter resume URL"
              value={resume_link}
              onChange={this.handleChange}
              required
            />

            <button type="submit" className="candidate-form-button">
              {id ? "Update Candidate" : "Add Candidate"}
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(CandidateForm);
