const Job = require('../models/jobModel.js')

// GET ALL JOBS 
const getJobs = async (req , res) => {
    try {
        const jobs = await Job.getAllJobs() ;
        res.status(200).json(jobs)
    } catch(error) {
        console.error(error);
        res.status(500).json({error : 'Server error'}) ;
    }
}

// Get all Jobs by id 
const getJobsById = async(req , res) => {
    try {
        const {id} = req.params ;
        const job = await Job.getJobById(id) ;
        if(!job) {
            return res.status(404).json({error : 'Job not Found'}) ;
        }
        res.status(200).json(job);
    } catch(error) {
        console.error(error) ;
        res.status(500).json({error : 'Server error'})
    }
}

// Create a new job 
const createJob = async(req , res) => {
    try {

        const {title , description , required_skills , recruiter_id} = req.body ;
        if(!title || !description || !required_skills || !recruiter_id) {
            return res.status(400).json({error : 'Missing required fields'})
        }

        const newJob = await Job.addJob(req.body) ;
        res.status(201).json(newJob);
    } catch(err) {
        console.error(err) ;
        res.status(500).json({err : 'Server error'})
    }
}

// Update an existing job 
const editJob = async (req, res) => {
  const { title, description, required_skills, recruiter_id } = req.body;
  const { id } = req.params;

  // Validation
  if (!title || !description || !required_skills || !recruiter_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updatedJob = await Job.updateJob(id, {
      title,
      description,
      required_skills,
      recruiter_id
    });

    res.status(201).json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Delete a Job 
const removeJob = async(req , res) => {
    try {
        const deleted = await Job.deleteJob(req.params.id) ;
        res.status(200).json(deleted);
    }catch(err) {
        console.error(err) ;
        res.status(500).json({err : 'Server error'})
    }
}

//Get /jobs/:id/exists
const checkJobExists = async(req , res) => {
    try {
        const {id} = req.params ;
        const [rows] = await Job.jobExists(id) ;

        if(rows.length===0) return res.status(404).json({exists : false , message : 'Job not Found'}) ;
        
        res.status(200).json({exists : true , job : rows[0]}) ;
    } catch(error) {
        console.error('Error ion checkJobExists :' ,error) ;
        res.status(500).json({error : 'Server error'}) ;
    }
}

module.exports = {
    getJobs , 
    getJobsById ,
    createJob , 
    editJob , 
    removeJob ,
    checkJobExists
}