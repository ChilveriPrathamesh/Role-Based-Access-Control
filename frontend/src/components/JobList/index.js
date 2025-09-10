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
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        )
    }
}

export default JobList;
