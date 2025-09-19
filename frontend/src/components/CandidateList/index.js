import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";
import Cookies from "js-cookie";
import Navbar from "../Navbar";
import "./index.css";

class CandidateList extends Component {
  state = { candidates: [] };

  componentDidMount() {
    this.fetchCandidates();
  }

  fetchCandidates = async () => {
    try {
      const userRole = Cookies.get("role");
      const userId = Cookies.get("userId");

      const res = await fetch(
        `${API_URL}?role=${encodeURIComponent(userRole)}&userId=${userId}`
      );
      const data = await res.json();
      this.setState({ candidates: Array.isArray(data) ? data : [] });
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      this.fetchCandidates();
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  render() {
    const { candidates } = this.state;
    const userRole = Cookies.get("role");

    return (
      <>
        <Navbar />
        <div className="candidate-list-container">
          <div className="candidate-list-header">
            <h1 className="candidate-title">Candidate List</h1>

            {/* Only Admin can add new candidate */}
            {userRole === "Admin" && (
              <Link to="/add-candidate">
                <button className="candidate-list-add-btn">Add Candidate</button>
              </Link>
            )}
          </div>

          <table className="candidate-list-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Resume</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td>{candidate.id}</td>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.phone_number}</td>
                  <td>{candidate.current_status}</td>
                  <td>
                    <a
                      href={candidate.resume_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resume View
                    </a>
                  </td>
                  <td>
                    {(userRole === "Admin" || userRole === "Recruiter") && (
                      <Link to={`/edit/${candidate.id}`}>
                        <button>Edit</button>
                      </Link>
                    )}

                    {userRole === "Admin" && (
                      <button onClick={() => this.handleDelete(candidate.id)}>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default CandidateList;
