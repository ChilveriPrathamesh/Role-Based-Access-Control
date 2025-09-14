const pool = require('../config/db');

//Get API to fetch all jobs from the Jobs table in the Database 

const getAllJobs = async() =>{
    try {
        const [rows] = await pool.query(
            `SELECT * 
             FROM jobs 
             ORDER BY created_at DESC
            `
        )
        return rows ;
    } catch(error) {
        console.error('Error fetching from jobs table in Databse :' + error.message)
        throw new Error('Error fetching from jobs table ')
        return [] ;
    }
}

// Get API to fetch a job by ID 
const getJobById = async (id) => {
    try {
        const [rows] = await pool.query(
            `SELECT * 
             FROM jobs 
             WHERE id = ?`
             , [id]
        )
        return rows[0] ;
    }
    catch (error) {
        console.error('Error fetching job by ID from the jobs table : ' + error.message) ;
        throw new Error('Error fetching job by ID from jobs table :' + error.message)
        return null ;
    }
}

// POST API to create or add a new job to the jobs table 
const addJob = async ({ title, description, required_skills, recruiter_id }) => {
    try {
        const [result] = await pool.query(
            `INSERT INTO jobs (title, description, required_skills, recruiter_id)
             VALUES (?, ?, ?, ?)`,
            [title, description, required_skills, recruiter_id]
        );

        return {
            id: result.insertId,
            title,
            description,
            required_skills,
            recruiter_id
        };
    } catch (err) {
        console.error("Error in addJob model:", err);
        throw err;
    }
};

//PUT API to update an existing job in a jobs table 
const updateJob = async (id, job) => {
  try {
    const { title, description, required_skills, recruiter_id } = job;

    const [result] = await pool.query(
      `UPDATE jobs 
       SET title = ?, description = ?, required_skills = ?, recruiter_id = ?
       WHERE id = ?`,
      [title, description, required_skills, recruiter_id, id]
    );

    if (result.affectedRows === 0) {
      throw new Error('Job not found');
    }

    return { id, ...job };
  } catch (error) {
    throw new Error('Error updating job in database: ' + error.message);
  }
};

//DELETE API to remove the job from the table 
const deleteJob = async (id) => {
    try {
        const [result] = await pool.query(
            `DELETE FROM jobs WHERE id = ?`, [id]
        );
        if (result.affectedRows === 0) {
            throw new Error(`No job is found with id ${id}`);
        }
        return { message: 'Job deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting job: ' + error.message);
    }
}

//Check if a job exists by ID 
const jobExists = async(jobId) => {
    try {
        const result = await pool.query(
            `SELECT id , title , description FROM jobs WHERE id = ?` , [jobId]
        )
        return result ;
    }
    catch (error) {
        throw new Error('Error to get the job details : ' + error.message) 
    }
} 

// Get job by recruiter ID 

const getJobByRecruiterId = async (recruiterId) => {
    try {
        const [rows] = await pool.query(
            `SELECT * 
             FROM jobs 
             WHERE recruiter_id = ? 
             ORDER BY created_at DESC
            `,[recruiterId] 
            
        ) 
        return rows 
    } catch(error) {
        console.error('Error fetching jobs by recruiter :' , error.message);
        throw new Error('error fetching recruiter jobs')
    }
}

// Get jobs for hiring manager
const getJobByHiringManagerId = async(hiringManagerId) => {
    try {
        const [rows] = await pool.query(`
                SELECT j.*
                FROM jobs j 
                INNER JOIN job_assignments ja ON j.id = ja.job_id 
                WHERE ja.hiring_manager_id = ?
            `,[hiringManagerId])
            return rows
    } catch(error){
        console.error('Error fetching jobs by hiring manager : ' , error.message) ;
        throw new Error('Error fetching jobs by hiring manager')
    }
}
module.exports = {
    getAllJobs ,
    getJobById ,
    addJob , 
    updateJob , 
    deleteJob ,
    jobExists ,
    getJobByRecruiterId ,
    getJobByHiringManagerId
} 