// import { Component } from "react";
// import Cookies from 'js-cookie'

// import { API_URL_LOGIN } from "../../config";
// import { Link, replace } from "react-router-dom";
// import withRouter from "../withRouter";

// import './index.css'

// class Login extends Component{
//     state = {
//         email : "",
//         password : "" ,
//         error : ""
//     }

//     handleChange = (event) => {
//         this.setState({[event.target.name] : event.target.value})
//     }

//     handleLogin =async (e) => {
//         e.preventDefault();

//         try{
//             const res = await fetch(`${API_URL_LOGIN}`,{
//                 method : "POST" ,
//                 headers : {
//                     "Content-Type" : "application/json" 
//                 } , 
//                 body : JSON.stringify({
//                     email : this.state.email ,
//                     password : this.state.password
//                 })
//             });
//             if(!res.ok) {
//                 throw new Error("Invalid credentials") ;
//             }
//             const data = await res.json();

//             Cookies.set("token" , data.token , {expires : 1}) ;
//             Cookies.set("role" , data.user.role , {expires : 1}) ;
//             Cookies.set('userId',data.user.id)

//             this.setState({error : ""}) 
//            // window.location.href = "/"
//            this.props.navigate("/" , {replace : true})

//         } catch(error) {
//             this.setState({error : error.message})
//         }
//     }

//     render() {
//         const {email , password} = this.state
//         return (
//             <div className="login-container">
//                 <div className="login-card">
//                     <h1 className="login-title">Login </h1>
//                     <form onSubmit={this.handleLogin} className="form-container">
//                         <div className="form-grp">
//                             <label htmlFor="email" className="form-label">Email</label>
//                             <input 
//                                 type="email"
//                                 name="email"
//                                 placeholder="Enter your Email"
//                                 value={email}
//                                 onChange={this.handleChange}
//                                 className="form-input"
//                                 required
//                             />
//                         </div>
//                         <div className="form-grp">
//                             <label htmlFor="password" className="form-label">Password</label>
//                             <input 
//                                 type="password"
//                                 name="password"
//                                 placeholder="Enter your Password"
//                                 value={password}
//                                 onChange={this.handleChange}
//                                 className="form-input"
//                                 required
//                         />
//                         </div>
//                         <button type="submit" className="login-btn">Login</button>
//                     </form>
//                     <p className="login-footer">
//                         Don't have an account?{" "}
//                         <Link to="/register" className="login-link">Register here</Link>
//                     </p>
//                 </div>
//             </div>
//         )
//     }
// }

// export default withRouter(Login)

import { Component } from "react";
import Cookies from "js-cookie";
import { API_URL_LOGIN } from "../../config";
import { Link } from "react-router-dom";
import withRouter from "../withRouter";
import "./index.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    message: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogin = async (e) => {
    e.preventDefault();
    this.setState({ message: "" });

    try {
      const res = await fetch(`${API_URL_LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        this.setState({ message: data.message || "❌ Invalid credentials" });
        return;
      }

      // Save cookies
      Cookies.set("token", data.token, { expires: 1 });
      Cookies.set("role", data.user.role, { expires: 1 });
      Cookies.set("userId", data.user.id, { expires: 1 });

      this.setState({ message: "✅ Login successful!" });

      // Redirect after showing success
      setTimeout(() => {
        this.props.navigate("/", { replace: true });
      }, 1000);
    } catch (error) {
      this.setState({ message: error.message || "Server error" });
    }
  };

  render() {
    const { email, password, message } = this.state;

    return (
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Login</h1>
          <form onSubmit={this.handleLogin} className="form-container">
            <div className="form-grp">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={email}
                onChange={this.handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-grp">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={password}
                onChange={this.handleChange}
                className="form-input"
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          {message && <p className="login-message">{message}</p>}

          <p className="login-footer">
            Don't have an account?{" "}
            <Link to="/register" className="login-link">
              Register here
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
