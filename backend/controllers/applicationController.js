const applicationsModel = require('../models/applicationModel.js')
const jobModel = require('../models/jobModel.js')
const candidateModel = require('../models/candidateModel.js')

//Apply to a job 
const applyToJob = async(req , res) => {
    try {
        const {jobId} = req.params ;
        const {candidate_id} = req.body

        if(!candidate_id) return res.status(400).json({error : 'candidate_id required'})

        //Ensure job exists 
        const jobRows = await jobModel.jobExists(jobId) ;
        if(jobRows.length === 0) {
            return res.status(404).json({error : 'Job not found'}) ;
        }
        
        //Ensure candidate exists 
        const candidateRows = await candidateModel.candidateExists(candidate_id) ;
        if(candidateRows.length === 0) {
            return res.status(404).json({error : 'Candidate not found'}) ;
        }

        try {
            await applicationsModel.applyToJob(candidate_id , jobId) ;
            res.status(201).json({message : 'Applied successfully'}) ;
        } catch(err) {
            if(err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({error : 'Candidate already applied to this job'})
            }

            console.error(err) ;
            res.status(500).json({error : 'Something went wrong'}) ;
        }

    } catch(error) {
        console.error(error) ;
        res.status(500).json({error : 'Server Error'}) ;
    }
}

 //GET all applications 
 const getAllApplications = async (req , res) => {
    try {
        const rows = await applicationsModel.getAllApplications();
        // if(rows.length === 0) {
        //     return res.status(404).json('There is no Data or applications ')
        // }
        res.status(201).json(rows) ;
    } catch(error) {
        console.error(error) ;
        res.status(500).json({error : 'Server error'})
    }
 }

 // Get applications by candidate 

 const getApplicationsByCandidate = async(req,res) => {
    try {
        const {candidateId} = req.params 
        const [rows] = await applicationsModel.getApplicationsByCandidate(candidateId) ;
        // if(rows.length === 0) {
        //     return res.status(404).json({message : 'There is no Data or applications by candidate'}) 
        // }
        res.status(201).json(rows)
    } catch(error) {
        console.error(error);
        res.status(500).json({error : 'Server Error'}) ;
    }
 }

 //Get applicants for a job 
 const getApplicantsForJob = async (req, res) => {
    try {
        const {jobId} = req.params 
        const [rows] = await applicationsModel.getApplicantsForJob(jobId) ;

        // if(rows.length=== 0) {
        //     return res.status(404).json({error : 'Failed to get applicants by jobId'})
        // }
        res.status(201).json(rows)
     } catch(err) {
        console.error(err);
        res.status(500).json({error : 'Server Error'})
     }
 }

 //Update application status 

 const updateApplicationsStatus =async (req, res) => {
    try {
        const {id} = req.params 
        const {status} = req.body
        if(!status) return res.status(400).json({error : 'status required'}) 
        
        await applicationsModel.updateApplicationsStatus(id , status);
        res.status(200).json({message : 'Application status updated'})
    } catch(err) {
        console.error(err) ;
        res.status(500).json({error : 'Server error'}) 
    }
 }

 // Delete Application
 const deleteApplication = async (req,res) => {
    try {
        const {id} = req.params 
        await applicationsModel.deleteApplication(id) ;
        res.status(204).send()
    }catch(error) {
        console.error(error) ;
        res.status(500).json({error : 'Server Error'})
    }
 }

 module.exports = {
    applyToJob ,
    getAllApplications , 
    getApplicationsByCandidate ,
    getApplicantsForJob ,
    updateApplicationsStatus,
    deleteApplication
 }