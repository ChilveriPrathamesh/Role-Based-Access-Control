import { Component } from "react";
import './index.css'
import Navbar from "../Navbar";
import { API_URL_JOBS, API_URL_APPLICATIONS } from "../../config";
import { Link } from "react-router-dom";

class JobList extends Component {
    state = {
        jobs: [],
        appliedJobs: [] // Track jobs the candidate has applied to
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.fetchJobDetails()
    }

    fetchJobDetails = async () => {
        try {
            const res = await fetch(API_URL_JOBS)
            const data = await res.json()
            this.setState({ jobs: data })
        } catch (error) {
            console.error("Error fetching jobs:", error)
        }
    }

    applyForJob = async (jobId) => {
        const candidateId = 2; // Replace with the logged-in candidate's ID dynamically

        try {
            const res = await fetch(`${API_URL_APPLICATIONS}/${jobId}/apply`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ candidate_id: candidateId })
            });

            const data = await res.json();
            if (res.ok) {
                alert("Applied successfully!");
                this.setState(prevState => ({
                    appliedJobs: [...prevState.appliedJobs, jobId]
                }));
            } else {
                alert(data.error || "Failed to apply for the job.");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong while applying for the job.");
        }
    }

    render() {
        const { jobs, appliedJobs } = this.state
        return (
            <>
                <Navbar />
                <div className="job-list-container">
                    <h1 className="job-list-title">Available Job Posting</h1>
                    <ul className="joblist-list">
                        {jobs.map((job) => (
                            <li key={job.id} className="joblist-item">
                                <h1 className="joblist-job-title">{job.title}</h1>
                                <p className="joblist-job-description">{job.description}</p>
                                <Link to={`/jobs/${job.id}`} className="joblist-details-link">
                                    View Details
                                </Link>

                                {/* Apply Button */}
                                {appliedJobs.includes(job.id) ? (
                                    <p style={{ color: "green", marginTop: "8px" }}>Already Applied</p>
                                ) : (
                                    <button
                                        className="apply-btn"
                                        onClick={() => this.applyForJob(job.id)}
                                    >
                                        Apply
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        )
    }
}

export default JobList;
