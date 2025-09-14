import { Component } from "react";

import Cookies from 'js-cookie'
import './index.css'

class Logout extends Component {
    handelLogout = () => {
        Cookies.remove("token")
        Cookies.remove("role")
        Cookies.remove("userId")
        window.location.href= "/login"
    }
    render(){
        return (
            <button onClick={this.handelLogout} className="logut-btn">
                Logout
            </button>
        )
    }
}

export default Logout