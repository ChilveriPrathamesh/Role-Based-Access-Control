import { Component } from "react";
import './index.css';
import { API_URL_JOBS, API_URL_APPLICATIONS } from "../../config";
import withRouter from "../withRouter";

class JobDetails extends Component {
  state = {
    job: null,
    candidates: [],
    error: null,
    loading: true
  };

  fetchJobDetails = async (id) => {
    try {
      const res = await fetch(`${API_URL_JOBS}/${id}`);
      const data = await res.json();
      console.log("Job Details:", data);

      if (res.ok) {
        this.setState({ job: data, error: null });
      } else {
        this.setState({ error: data.error || "Failed to fetch job details" });
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
      this.setState({ error: "Error fetching job details" });
    }
  };

  fetchCandidates = async (id) => {
    try {
      const res = await fetch(`${API_URL_APPLICATIONS}/job/${id}`);
      const data = await res.json();
      console.log("Candidates:", data);

      if (res.ok) {
        this.setState({ candidates: data, error: null });
      } else {
        this.setState({ error: data.error || "Failed to fetch candidates" });
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
      this.setState({ error: "Error fetching candidates" });
    }
  };

  async componentDidMount() {
    const { id } = this.props.params;
    await this.fetchJobDetails(id);
    await this.fetchCandidates(id);
    this.setState({ loading: false });
  }

  render() {
    const { job, candidates, error, loading } = this.state;

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
      <div className="job-details-container">
        <h2 className="job-title">{job?.title}</h2>
        <p><strong>Description:</strong> {job?.description}</p>
        <p><strong>Skills Required:</strong> {job?.required_skills}</p>

        <h3>Applicants</h3>
        {candidates.length > 0 ? (
          <ul className="applicants-list">
            {candidates.map(candidate => (
              <li key={candidate.id} className="applicant-item">
                {candidate.candidate_name} - {candidate.email}
              </li>
            ))}
          </ul>
        ) : (
          <p>No applicants yet.</p>
        )}
      </div>
    );
  }
}

export default withRouter(JobDetails);
