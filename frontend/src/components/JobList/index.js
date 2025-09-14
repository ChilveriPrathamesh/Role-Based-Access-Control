import { Component } from "react";
import './index.css'
import Navbar from "../Navbar";
import { API_URL_JOBS } from "../../config";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'

class JobList extends Component {
    state = {
        jobs: [],
        role: ""
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const role = Cookies.get("role")
        this.setState({ role })
        this.fetchJobDetails()
    }

    fetchJobDetails = async () => {
        try {
            const token = Cookies.get('token')
            const res = await fetch(API_URL_JOBS ,{
                headers : {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type' : 'application/json'
                }
            })
            const data = await res.json()
            this.setState({ jobs: data.jobs })
        } catch (error) {
            console.error("Error fetching jobs:", error)
        }
    }

    handleDelete = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;

        try {
            const token = Cookies.get("token")
            const res = await fetch(`${API_URL_JOBS}/${jobId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json()
            if (res.ok) {
                alert(data.message || "Job deleted successfully")
                // Refresh job list after deletion
                this.fetchJobDetails()
            } else {
                alert(data.message || "Failed to delete job")
            }
        } catch (error) {
            console.error("Error deleting job:", error)
            alert("Something went wrong!")
        }
    }

    render() {
        const { jobs, role } = this.state
        return (
            <>
                <Navbar />
                <div className="job-list-container">
                    <h1 className="job-list-title">Available Job Posting</h1>
                    <ul className="joblist-list">
                        {Array.isArray(jobs) && jobs.length > 0 ? (
                            jobs.map((job) => (
                                <li key={job.id} className="joblist-item">
                                    <h1 className="joblist-job-title">{job.title}</h1>
                                    <p className="joblist-job-description">{job.description}</p>
                                    <Link to={`/jobs/${job.id}`} className="joblist-details-link">
                                        View Details
                                    </Link>

                                    {/* ✅ Only Admins see the Delete button */}
                                    {role === "Admin" && (
                                        <button
                                            className="joblist-delete-btn"
                                            onClick={() => this.handleDelete(job.id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </li>
                            ))
                        ) : (
                            <p>No jobs available</p>
                        )}
                    </ul>
                </div>
            </>
        )
    }
}

export default JobList;
