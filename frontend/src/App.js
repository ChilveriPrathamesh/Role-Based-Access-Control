import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import CandidateForm from "./components/CandidateForm";
import CandidateList from "./components/CandidateList";
import Home from "./components/Home";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route exact path = "/" element ={<Home/>} />
          <Route path="/candidatelist" element={<CandidateList />} />
          <Route path="/add-candidate" element={<CandidateForm />} />
          <Route path="/edit/:id" element={<CandidateForm />} />
          <Route path = "/job-list" element = {<JobList/>} />
          <Route path="/jobs/:id" element={<JobDetails/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;