import {Component} from 'react' ;
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'

import './index.css'
import Logout from '../Logout';

class Navbar extends Component{
    render() {
        const role = Cookies.get("role")
        const userId = Cookies.get("userId")
        return(
            <div>
                <nav className='navbar'>
                    <div className='navbar-left'>
                        <h1 className='app-title'>Job Posting and Application Portal</h1>
                    </div>
                
                
                <div className='navbar-links'>
                    <Link  to ="/">Home</Link>
                    {/* Candidate list visible to Admin , Recruiter , Hiring Manager */}
                    {role && (role==='Admin' || role ==='Recruiter' || role ==='Hiring Manager') && (
                        <Link to = "/candidatelist">Candidate List</Link>
                    )}

                    {/*Add Candidate visible to Admin & Recruiter*/}
                    {role && (role === 'Admin' || role==='Recruiter') &&(
                        <Link to = "/add-candidate">Add Candidate</Link>
                    )}
                    
                    
                    <Link to ="/job-list" >Job List</Link>
                    {role && (role === 'Recruiter' || role === 'Admin') && (
                        <Link to="/add-job">Add Job</Link>
                    )}

                    {/* Auth controls */}
                    {Cookies.get("token") ? (
                        <>
                            <Logout />
                        </>
                    ):(
                        <>
                            <Link to = "/login" > Login</Link>
                            <Link to="/register" >Register</Link>
                        </>
                    )}
                    
                </div>
                </nav>
                </div>
            
        )
    }
}

export default Navbar