CREATE DATABASE candidate_db ; 

USE candidate_db ;

-- For the candidates table
CREATE TABLE candidates(
id INT AUTO_INCREMENT PRIMARY KEY , 
name VARCHAR(100) NOT NULL , 
email VARCHAR(100) UNIQUE NOT NULL ,
phone_number VARCHAR(15),
current_status  VARCHAR(50) DEFAULT 'Applied' ,
resume_link VARCHAR(255) ,
created_at TIMESTAMP DEFAULT current_timestamp
);

-- Jobs Table
CREATE TABLE IF NOT EXISTS jobs(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    title VARCHAR(100) NOT NULL , 
    description TEXT , 
    required_skills VARCHAR(255), 
    recruiter_id INT , 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)

-- Applications Join Table 

CREATE TABLE IF NOT EXISTS applications(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    candidate_id INT NOT NULL , 
    job_id INT NOT NULL ,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP , 
    status VARCHAR(50) DEFAULT 'Applied' , 
    UNIQUE KEY unique_application (candidate_id , job_id) ,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE , 
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE  

)
