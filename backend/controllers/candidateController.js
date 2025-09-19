const Candidate = require('../models/candidateModel.js');

//GET all candidates 
const getCandidates = async (req , res) => {
    try {
        const candidates = await Candidate.getAllCandidates() ;
        res.status(200).json(candidates)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

//Get candidate by id 
const getCandidate = async (req,res) => {
    try {
        const id = req.params.id ;
        const candidate = await Candidate.getCandidateById(id);
        res.status(200).json(candidate)
    } catch(error) {

    }
}

//CREATE a new candidate 
const createCandidate = async (req , res) => {
    try {
        const newCandidate = await Candidate.addCandidate(req.body);
        res.status(201).json(newCandidate);
    } catch(error) {
        res.status(500).json({error : error.message})
    }
}

//UPDATE an existing candidate 

const editCandidate = async (req, res) => {
    try {
        const updated = await Candidate.updateCandidate(req.params.id , req.body) ;
        res.status(200).json(updated);
    } catch(error) {
        res.status(500).json({error : error.message});
    }
}

// DELETE a candidate 

const removeCandidate = async (req, res) => {
    try {
        const result = await Candidate.deleteCandidate(req.params.id) ;
        res.status(200).json(result) ;
    }
    catch(error) {
        res.status(500).json({error : error.message}) ;
    }
}

//GET /candidates/:id/exists 

const checkCandidateExists = async(req,res) => {
    try {
        const {id} =req.params ;
        const [rows] = await Candidate.candidateExists(id) ;

        if(rows.length === 0) {
            return res.status(404).json({exists : false , message : 'Candidate not found'}) ;
        }

        res.status(200).json({exists : true , candidate : rows[0]})
    } catch(error) {
        console.error('Error in chechCandidateExists : ' , error) ;
        res.status(500).json({error : 'Server Error'}) 
    }
}

module.exports = {
    getCandidates ,
    getCandidate,
    createCandidate , 
    editCandidate , 
    removeCandidate ,
    checkCandidateExists
}