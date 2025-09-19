// import React, { Component } from "react";
// import Cookies from "js-cookie";
// import {API_URL_REGISTER , API_URL_LOGIN} from '../../config.js'
// import {Link} from 'react-router-dom'
// import withRouter from "../withRouter/index.js";

// import './index.css'

// class Register extends Component {
//   state = { email: "", password: "", role: "Candidate", message: "" };

//   handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

//   handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       //Register the user
//       const res = await fetch(`${API_URL_REGISTER}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: this.state.email,
//           password: this.state.password,
//           role: this.state.role,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Registration failed");
//       }

//       //Auto-login after successful registration
//       const loginRes = await fetch(`${API_URL_LOGIN}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: this.state.email,
//           password: this.state.password,
//         }),
//       });

//       const loginData = await loginRes.json();

//       if (!loginRes.ok) {
//         throw new Error(loginData.message || "Login after registration failed");
//       }

//       //Set cookies
//       Cookies.set("token", loginData.token, { expires: 1 });
//       Cookies.set("role", loginData.user.role, { expires: 1 });
//       Cookies.set("role" , loginData.user.id , {expires : 1});

//       this.setState({ message: "Registration and login successful!" });

//       // Redirect to dashboard/home
//       //window.location.href = "/";
//       this.props.navigate("/" , {replace : true})


//     } catch (error) {
//       this.setState({ message: error.message });
//     }
//   };

//   render() {
//     return (
//       <div className="register-container">
//         <div className="register-card">
//           <h2 className="register-title">Create an account </h2>
//           <form onSubmit={this.handleRegister} className="form-container">
//             <div className="form-grp">
//               <label htmlFor="email" className="form-label">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={this.state.email}
//                 onChange={this.handleChange}
//                 className="form-input"
//                 required
//               />
//             </div>

//             <div className="form-grp">
//               <label htmlFor="password" className="form-label">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={this.state.password}
//                 onChange={this.handleChange}
//                 className="form-input"
//                 required
//               />
//             </div>
//             <div className="form-grp">
//               <label htmlFor="role" className="form-label">Role</label>
//               <select
//                 name="role"
//                 value={this.state.role}
//                 onChange={this.handleChange}
//                 className="form-input"
//                 required
//               >
               
//                 <option value="Recruiter">Recruiter</option>
//                 <option value="Hiring Manager">Hiring Manager</option>
//                 <option value="Admin">Admin</option>
//               </select>
//             </div>
//             <button type="submit" className="register-btn">Register</button>
//           </form>
//           {this.state.message && <p className="register-message"> {this.state.message}</p>}

//           <p className="register-footer">
//             Already have an account?{" "}
//             <Link to="/login" className="register-link">Login here</Link>
//           </p>
//         </div>
//       </div>
//     );
//   }
// }

// export default withRouter(Register);


import React, { Component } from "react";
import Cookies from "js-cookie";
import { API_URL_REGISTER, API_URL_LOGIN } from "../../config.js";
import { Link } from "react-router-dom";
import withRouter from "../withRouter/index.js";

import "./index.css";

class Register extends Component {
  state = { email: "", password: "", role: "Recruiter", message: "" };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleRegister = async (e) => {
    e.preventDefault();
    this.setState({ message: "" }); // reset old messages

    try {
      // Register the user
      const res = await fetch(`${API_URL_REGISTER}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          role: this.state.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        this.setState({ message: data.message || "Registration failed" });
        return;
      }

      // Auto-login after successful registration
      const loginRes = await fetch(`${API_URL_LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        this.setState({
          message: loginData.message || "Login after registration failed",
        });
        return;
      }

      // Set cookies
      Cookies.set("token", loginData.token, { expires: 1 });
      Cookies.set("role", loginData.user.role, { expires: 1 });
      Cookies.set("userId", loginData.user.id, { expires: 1 });

      this.setState({ message: "✅ Registration and login successful!" });

      // Redirect to dashboard/home after delay (to show message briefly)
      setTimeout(() => {
        this.props.navigate("/", { replace: true });
      }, 1000);
    } catch (error) {
      this.setState({ message: error.message || "Server error" });
    }
  };

  render() {
    return (
      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Create an account</h2>
          <form onSubmit={this.handleRegister} className="form-container">
            <div className="form-grp">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
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
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-grp">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                name="role"
                value={this.state.role}
                onChange={this.handleChange}
                className="form-input"
                required
              >
                <option value="Recruiter">Recruiter</option>
                <option value="Hiring Manager">Hiring Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="register-btn">
              Register
            </button>
          </form>

          {this.state.message && (
            <p className="register-message">{this.state.message}</p>
          )}

          <p className="register-footer">
            Already have an account?{" "}
            <Link to="/login" className="register-link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
