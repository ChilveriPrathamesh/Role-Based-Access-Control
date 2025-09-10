import React from "react";
import "./index.css";
import Navbar from "../Navbar";

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="home-para">
      <p>
        Welcome to the Job Posting and Application Portal – a simple and
        intuitive platform for connecting employers with talented candidates.
        Employers can post job openings, update details, and manage applications
        efficiently. Candidates can browse jobs, view descriptions, and apply
        with ease. Track the status of applications in real time to stay
        informed throughout the recruitment process. Role-based access ensures
        admins and candidates have features tailored to their needs. The portal
        prevents duplicate applications and maintains timestamped records for
        transparency. Interactive search and filter tools make it easy to find
        and manage opportunities. Overall, it streamlines recruitment, helping
        organizations connect talent with the right opportunities quickly and
        effectively.
      </p>
    </div>
    </>
  );
};

export default Home;
