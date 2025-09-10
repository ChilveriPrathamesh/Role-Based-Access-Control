
const pool = require('../config/db.js')


// Apply to a job
const applyToJob = async (candidate_id , job_id) => {
    try {
        const [result] = await pool.query(
            `INSERT INTO applications (candidate_id , job_id)
             VALUES (? , ?)` ,[candidate_id , job_id]
        )
        return {applicationId : result.insertId , candidate_id , job_id}
    }
    catch(error) {
        throw new Error('Error applying to job : ' + error.message)
    }
}

// Get all applications
const getAllApplications =async (jobId) => {
    try {
        const [result] =await pool.query(`
         SELECT a.id , c.name as candidate_name , j.title AS job_title ,
                a.applied_at , a.status
        FROM applications a 
        JOIN candidates c ON a.candidate_id = c.id 
        JOIN jobs j ON a.job_id = j.id 
        ORDER BY a.applied_at DESC` , [jobId])
        return result ;
    }catch(error) {
        throw new Error('Error fetching applicants: '+error.message)
    }
}

// Get applications by candidate 
const getApplicationsByCandidate = async(candidate_id) => {
    try {
        const query = await pool.query(
        `SELECT a.id , j.title AS job_title , a.applied_at , a.status
        FROM applications a 
        JOIN jobs j ON a.job_id = j.id 
        WHERE a.candidate_id = ? 
        ORDER BY a.applied_at DESC
        `,[candidate_id])
        return query
    } catch(error) {
        throw new Error('Error fetching applicants by candidate: ' + error.message) 
    }
}

//Get applications by job 
const getApplicantsForJob = async (job_id) => {
    try {
        const query = await pool.query(
            `SELECT 
                c.id, 
                c.name AS candidate_name, 
                c.email AS email,
                c.phone_number AS phone_number, 
                c.current_status AS current_status,
                c.resume_link AS resume_link, 
                a.applied_at AS applied_at,
                a.status AS application_status
            FROM applications a 
            JOIN candidates c ON a.candidate_id = c.id 
            WHERE a.job_id = ? 
            ORDER BY a.applied_at DESC`,[job_id]
        )
        return query ;
    } catch(error) {
        throw new Error('Error fetching applications by job_id : ' + error.message)
    }
}

//Update application status 
const updateApplicationsStatus = async(id , status) => {
    try {
        const query = await pool.query(
            `UPDATE applications SET status = ?
            WHERE  id = ?` , [status , id]
        )
        return query
    }
    catch(error) {
        throw new Error('Failed to Update application statu in applications table :' +error.message )
    }
}

//Delete application 
const deleteApplication = async(id) => {
    try {
        const query = await pool.query(
            `DELETE FROM applications WHERE id = ?` , [id]
        ) 
        return query ;
    } catch(error) {
        throw new Error('Failed to deleted the application : ' + error.message)
    }
}

module.exports = {
    applyToJob , 
    getAllApplications,
    getApplicationsByCandidate ,
    getApplicantsForJob ,
    updateApplicationsStatus , 
    deleteApplication
}