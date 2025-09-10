import React , {Component} from "react"; 

import './index.css';
import { API_URL } from "../../config";
import Navbar from "../Navbar";

class CandidateForm extends Component{

    state = {
        id : null , 
        name : "" ,
        email : "",
        phone_number : "",
        current_status : "",
        resume_link : ""
    }

    constructor(props){
        super(props);
    }

    handleChange = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    }


    // Fetching the url is pending
    handleSubmit = async (e) =>{ 
        e.preventDefault();
        const{id , ...candidate} = this.state
        const method = id ? "PUT" : "POST" 
        const url = id ? `${API_URL}/${id}` : API_URL ;

        try {
            await fetch(url , {
                method , 
                headers : {"Content-Type" : "application/json"} ,
                body : JSON.stringify(candidate), 
              
            })  
            window.location.href = "/" ;

        } catch(error) {
            console.error('Error saving form : ' , error)
        }
    }

    render(){

        const {id , name , email , phone_number , current_status , resume_link} = this.state
        return(    
            <> 
            <Navbar/> 
           <div className="candidate-form-container">
            <h1 className="candidate-form-title">{id ? "Edit Candidate" : "Add Candidate"}</h1>
            <form className="candidate-form" onSubmit={this.handleSubmit}>
                <label htmlFor="name" className="candidate-form-label">Full Name</label>
                <input 
                    id = "name"
                    type = "text"
                    name="name"
                    className="candidate-form-input"
                    placeholder="Enter full name"
                    value={name}
                    onChange={this.handleChange}
                    required
                />
                <label htmlFor="email">Email</label>
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
                    id = "phone_number"
                    type = "text"
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
                <label htmlFor="resume_link" className="candidate-form-label" >Resume URL</label>
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
                <button type="submit" className="candidate-form-button">{id ? "Update Candidate" : "Add Candidate"}</button>
            </form>
           </div>
           </>
        )
    }
}

export default CandidateForm;