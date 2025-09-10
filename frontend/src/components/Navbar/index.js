import {Component} from 'react' ;
import { Link } from 'react-router-dom';

import './index.css'

class Navbar extends Component{
    render() {
        return(
            <div>
                <nav className='navbar'>
                <h1 className='app-title'>Job Posting and Application Portal</h1>
                <div>
                    <Link  to ="/">Home</Link>
                    <Link to = "/candidatelist">Candidate List</Link>
                    <Link to = "/add-candidate">Add Candidate</Link>
                    <Link to ="/job-list" >Job List</Link>
                    <Link to="/add-job">Add Job</Link>
                </div>
                </nav>
                </div>
            
        )
    }
}

export default Navbar