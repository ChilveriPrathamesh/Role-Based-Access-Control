import { Component } from "react";
import Navbar from '../Navbar'
import {API_URL_JOBS , API_URL_APPLICATIONS} from '../../config'
import withRouter from "../withRouter";
import Cookies from 'js-cookie'
import './index.css'
class JobDetails extends Component{
  state = {
    job:null , 
    candidates : [] ,
    candidateId : "" //candidate who is applying
  }

  fetchJobDetails = async (id) => {
    try {
      const token = Cookies.get("token")
      const res = await fetch(`${API_URL_JOBS}/${id}`,{
        headers : {
          "Authorization" : `Bearer ${token}`,
          "Content-Type" : "application/json"
        }
      }) ;
      if(!res.ok) throw new Error('Failed to fetch Job Details') ;
      const data = await res.json();
      this.setState({job : data});
    } catch(error) {
      console.error('Error fetching job details :' , error)
    }
  }
  fetchCandidates = async (id) => {
    try{
      const token = Cookies.get("token")
      const res = await fetch(`${API_URL_APPLICATIONS}/job/${id}`,{
        headers : {
          "Authorization" : `Bearer ${token}` ,
          "Content-Type" : "application/json"
        }
      });

      if(!res.ok) {
        console.error("Failed to fetch the candidates")
      }
      const data = await res.json()
      console.log("Candidate :" , data);
      this.setState({candidates : data})
      
    } catch(error) {
      console.error("Error fetching candidates:" ,error)
    }
  }

  async componentDidMount() {
    const { id } = this.props.params ;
    await this.fetchJobDetails(id) ;
    await this.fetchCandidates(id) ;
  }

  onChangeCandidate = event => {
    this.setState({candidateId : event.target.value})
  }

  handleApply = async () => {
    try{
      const {id} = this.props.params;
      const {candidateId} = this.state 

      if(!candidateId) {
        alert("Please enter Candidate ID to apply!")
        return ;
      } 
      const res = await fetch(`${API_URL_APPLICATIONS}/${id}/apply`,{
          method : "POST" , 
          headers : {
            "Content-Type" : "application/json" 
          },
          body : JSON.stringify({
            candidate_id : candidateId
          })
        })
      if(!res.ok) throw new Error("Network response was not ok")
      const data = await res.json()
      console.log("Application successful :" , data)  
      // Show success alert 
      alert("You have successfully applied for the job")

      //Optionally, refersh the candidates ist ot include the new applicant
      await this.fetchCandidates(id)
    } catch(error) {
      console.error("Error applying to job :" , error)
      alert("Failed to apply the job. Please try again")
    }
  }

  render() {
    const {job , candidates , candidateId} = this.state ;
    return(
      <>
        <Navbar />
        <div className="job-details-container">
          <h1 className="job-title">{job?.title}</h1>
          <p><strong>Description :</strong>{job?.description}</p>
          <p><strong>Skills Required :</strong>{job?.required_skills}</p>
          <div className="apply-container">
              <h1 className="apply-title">Apply for this Job</h1>
              <input 
                type="number"
                placeholder="Enter Candidate ID"
                value={candidateId}
                onChange={this.onChangeCandidate}
              /> 
              <button onClick={this.handleApply}>Apply</button>
          </div>
          <h2>Applicants</h2> 
          {candidates.length>0 ? (
            <ul className="applicants-list">
                {candidates.map(cand => (
                  <li key={cand.id} className="applicants-item">
                    {cand.candidate_name} - {cand.email}
                  </li>
                ))}
            </ul>
          ) : 
          (
            <p>No applicants yet.</p>
          )}
        </div>
      </>
    )
  }
}

export default withRouter(JobDetails)