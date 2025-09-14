# Project 3: Advanced Role-Based Access Control (RBAC)

This project expands on the Candidate Management System by introducing
jobs and applications, allowing recruiters to post jobs and candidates
to apply. The system now handles a **many-to-many relationship**: a
candidate can apply to multiple jobs, and a job can have multiple
applicants.

------------------------------------------------------------------------

## Features

-   Candidate management (add, edit, view, delete).
-   Job management (add, edit, view, delete).
-   Apply functionality to link candidates with jobs.
-   View all candidates who applied for a specific job.
-   RESTful API endpoints for Candidates, Jobs, and Applications.
-   Swagger API documentation.
-   React frontend integrated with backend APIs.
-   Unit tests for both frontend components and backend endpoints.

------------------------------------------------------------------------

## Technologies Used

**Frontend:** - React.js\
- React Router\
- CSS / Bootstrap

**Backend:** - Node.js\
- Express.js\
- MySQL\
- Swagger (OpenAPI 3.0)

**Testing:** - Jest\
- React Testing Library\
- Supertest (for backend testing)

------------------------------------------------------------------------

## Database Schema

-   **candidates** table: Stores candidate details.\
-   **jobs** table: Stores job details (id, title, description,
    required_skills, recruiter_id).\
-   **applications** table: Many-to-many mapping with candidate_id and
    job_id.

------------------------------------------------------------------------

## Project Structure

    job-posting-and-application-portal/
    │
    ├── backend/
    │   ├── controllers/
    │   │   ├── candidateController.js
    │   │   ├── jobController.js
    │   │   └── applicationController.js
    │   ├── models/
    │   │   ├── candidateModel.js
    │   │   ├── jobModel.js
    │   │   └── applicationModel.js
    │   ├── routes/
    │   │   ├── candidateRoutes.js
    │   │   ├── jobRoutes.js
    │   │   └── applicationRoutes.js
    │   ├── config/
    │   │   └── db.js
    │   ├── swagger.js
    │   ├── server.js
    │   └── package.json
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── CandidateForm.js
    │   │   │   ├── CandidateList.js
    │   │   │   ├── JobList.js
    │   │   │   └── JobDetails.js
    │   │   ├── App.js
    │   │   └── index.js
    │   ├── package.json
    │   └── public/
    │
    └── README.md

------------------------------------------------------------------------

## Backend Setup

### Environment Variables

Create a `.env` file in the backend folder:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=job_portal_db
    PORT=5000

Replace `your_password` with your MySQL password.

------------------------------------------------------------------------

### Install Dependencies

    cd backend
    npm install

Dependencies include:

-   express\
-   mysql2\
-   body-parser\
-   cors\
-   dotenv\
-   swagger-jsdoc\
-   swagger-ui-express\
-   nodemon (for development)

------------------------------------------------------------------------

### Run Server

    npm start

Server runs on `http://localhost:5000`.\
Swagger docs available at `http://localhost:5000/api-docs`.

------------------------------------------------------------------------

## API Documentation (Swagger)

Example endpoints:

-   `GET /api/candidates` → Get all candidates\

-   `POST /api/candidates` → Add a new candidate\

-   `PUT /api/candidates/:id` → Update candidate by ID\

-   `DELETE /api/candidates/:id` → Delete candidate by ID

-   `GET /api/jobs` → Get all jobs\

-   `POST /api/jobs` → Add a new job\

-   `PUT /api/jobs/:id` → Update job by ID\

-   `DELETE /api/jobs/:id` → Delete job by ID

-   `POST /api/applications/{jobId}/apply` → Candidate applies for a job\

-   `GET /api/applications/{jobId}/candidates` → Get all candidates who applied
    for a job

------------------------------------------------------------------------

## Frontend Setup

### Install Dependencies

    cd frontend
    npm install

### Run Frontend

    npm start

Frontend runs on `http://localhost:3000`.

Navigation:\
- `/` → Candidate List\
- `/add` → Add Candidate Form\
- `/edit/:id` → Edit Candidate Form\
- `/jobs` → Job List\
- `/jobs/:id` → Job Details with applicant list and Apply button

------------------------------------------------------------------------

## Unit Testing

### Frontend

Uses **Jest** and **React Testing Library**.

-   Tests components like CandidateForm, CandidateList, JobList, and
    JobDetails.\
-   Mocks API calls to verify data rendering and submission.

Run frontend tests:

    npm test

### Backend

Uses **Jest + Supertest**.

-   Tests endpoints for Candidates, Jobs, and Applications.\
-   Example: Apply endpoint should insert a row into the `applications`
    table.

------------------------------------------------------------------------

## Future Improvements

-   Add authentication for recruiters and candidates.\
-   Pagination and search for jobs and candidates.\
-   File upload for resumes instead of URLs.\
-   Notification system for job applications.


## Detailed Breakdown

### 1. Database Schema (New User Table):

- Create a users table with columns: id, email, password_hash, and role.
- Crucial: Never store passwords as plain text. Always use a secure hashing
  algorithm like bcrypt.

### 2. Back-end API (Security Layer):

- **Login Endpoint**: Create a `POST /api/login` route. It will check the user's
  credentials against the database. If correct, it will generate a JSON Web Token
  (JWT), which is like a secure ID badge for your application. This token will
  contain the user's id and role.
- **Secure All Endpoints**: Implement a security check for every API endpoint.
  Before any action, your back end must:
  - Verify the JWT from the request header.
  - Check the role inside the token.
  - If the user's role does not have permission for the requested action (e.g.,
    a "Recruiter" trying to DELETE a job), return a **403 Forbidden** error.

### 3. Front-end (Dynamic UI):

- **Login Page**: A simple form for a user to enter their email and password.
- **Dynamic UI**: The front end needs to be "smart." Based on the user's role (which
  you can get from the JWT), you will dynamically show or hide buttons and
  pages. For example:
  - If the user is an Admin, they see all the CRUD buttons.
  - If the user is a Recruiter, the "Delete" buttons are not even rendered on
    the page.
  - If the user is a Hiring Manager, they only see candidates for jobs they
    are assigned to.
- **Log Out**: Create a button that removes the JWT from the front end, effectively
  logging the user out.
