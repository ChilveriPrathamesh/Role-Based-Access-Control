import { Component } from "react";
import './index.css'
import Navbar from '../Navbar'
import { API_URL_JOBS } from "../../config";

class AddJob extends Component {

    state = {
        title : "",
        description : "" ,
        required_skills : "",
        recruiter_id : "" , 
        message : "" ,
    }

    handleChange = (event) => {
        this.setState({[event.target.name] :event.target.value})
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {title , description , required_skills , recruiter_id} = this.state ;
        if(!title || !description || !required_skills || !recruiter_id) {
            this.setState({message : "Please fill all fields"})
            return ;
        }
        try {
            const res = await fetch(`${API_URL_JOBS}`,{
                method : "POST" , 
                headers : {
                    "Content-Type" : "application/json",
                }, 
                body : JSON.stringify({
                    title , 
                    description , 
                    required_skills , 
                    recruiter_id 
                }),
            });
            if(res.ok) {
                this.setState({
                    message : "Job added successfully" , 
                    title : "" ,
                    description : "",
                    required_skills : "",
                    recruiter_id : "",
                })
            } else {
                this.setState({message : "Failed to add job"})
            }
        } catch(error) {
            console.error("Error adding job :" , error);
            this.setState({message : "Failed to add job"})
        }
    }

    render() {
        const {title , description , required_skills , recruiter_id , message} = this.state
        return(
            <>
                <Navbar/>
                <div className="add-job-container">
                    <h1 className="add-job-title">Add New Job</h1>
                    {message && <p className="message">{message}</p>}
                    <form onSubmit={this.handleSubmit} className="form-container" >
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" 
                            name="title"
                            value={title}
                            onChange={this.handleChange}
                            className="form-input"
                        />
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea 
                            type = "text"
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
                         <label htmlFor="recruiter_id" className="form-label">Recruiter ID</label>
                         <input 
                            type="text"
                            name="recruiter_id"
                            value={recruiter_id}
                            onChange={this.handleChange}
                            className="form-input"
                         />
                         <button className="job-btn" type="submit">Add Job</button>
                    </form>
                </div>
            </>
        )
    }
}

export default AddJob