import { Component } from "react";
import "./index.css";
import Navbar from "../Navbar";
import { API_URL_JOBS } from "../../config";
import Cookies from "js-cookie";

class AddJob extends Component {
  state = {
    title: "",
    description: "",
    required_skills: "",
    recruiter_id: "",
    message: "",
    role: Cookies.get("role") || null,
  };

  componentDidMount() {
    const userId = Cookies.get("userId");
    if (this.state.role === "Recruiter" && userId) {
      this.setState({ recruiter_id: userId });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, required_skills, recruiter_id, role } = this.state;

    if (!(role === "Recruiter" || role === "Admin")) {
      this.setState({ message: "Unauthorized: you don't have permission to add jobs." });
      return;
    }

    if (!title || !description || !required_skills || !recruiter_id) {
      this.setState({ message: "Please fill all fields." });
      return;
    }

    try {
      // Get token from cookie
      const token = (Cookies.get("token") || "").replace(/"/g, "").trim();
      if (!token) {
        this.setState({ message: "Token not found. Please login again." });
        return;
      }

      const res = await fetch(`${API_URL_JOBS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // attach JWT
        },
        body: JSON.stringify({ title, description, required_skills, recruiter_id }),
      });

      if (res.ok) {
        this.setState({
          message: "Job added successfully!",
          title: "",
          description: "",
          required_skills: "",
          recruiter_id: role === "Recruiter" ? recruiter_id : "",
        });
      } else if (res.status === 401) {
        this.setState({ message: "Unauthorized: invalid or expired token. Please login again." });
      } else {
        const err = await res.json().catch(() => ({}));
        this.setState({ message: err.message || "Failed to add job." });
      }
    } catch (error) {
      console.error("Error adding job:", error);
      this.setState({ message: "Failed to add job." });
    }
  };

  render() {
    const { title, description, required_skills, recruiter_id, message, role } = this.state;

    return (
      <>
        <Navbar />
        <div className="add-job-container">
          <h1 className="add-job-title">Add New Job</h1>
          {message && <p className="message">{message}</p>}
          <form onSubmit={this.handleSubmit} className="form-container">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleChange}
              className="form-input"
            />

            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={this.handleChange}
              className="form-input"
            />

            <label htmlFor="required_skills" className="form-label">Required Skills</label>
            <input
              type="text"
              name="required_skills"
              value={required_skills}
              onChange={this.handleChange}
              className="form-input"
            />

            {role === "Recruiter" ? (
              <div className="form-note">
                Recruiter ID will be set to your account (auto-filled)
              </div>
            ) : (
              <>
                <label htmlFor="recruiter_id" className="form-label">Recruiter ID</label>
                <input
                  type="text"
                  name="recruiter_id"
                  value={recruiter_id}
                  onChange={this.handleChange}
                  className="form-input"
                />
              </>
            )}

            <button className="job-btn" type="submit">Add Job</button>
          </form>
        </div>
      </>
    );
  }
}

export default AddJob;
