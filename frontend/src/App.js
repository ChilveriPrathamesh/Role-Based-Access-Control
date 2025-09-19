import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";
import CandidateForm from "./components/CandidateForm";
import CandidateList from "./components/CandidateList";
import AssignCandidate from "./components/AssignCandidate";
import Home from "./components/Home";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import AddJob from "./components/AddJob";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={!Cookies.get("token") ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/register"
            element={!Cookies.get("token") ? <Register /> : <Navigate to="/" replace />}
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />

          {/* Candidate Routes */}
          <Route
            path="/candidatelist"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Recruiter", "Hiring Manager"]}>
                <CandidateList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-candidate"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Recruiter"]}>
                <CandidateForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Recruiter"]}>
                <CandidateForm />
              </ProtectedRoute>
            }
          />

          {/* Assign Candidate (Admin only) */}
          <Route
            path="/assign-candidate"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AssignCandidate />
              </ProtectedRoute>
            }
          />

          {/* Job Routes */}
          <Route
            path="/job-list"
            element={
              <ProtectedRoute>
                <JobList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <ProtectedRoute>
                <JobDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-job"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Recruiter"]}>
                <AddJob />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
