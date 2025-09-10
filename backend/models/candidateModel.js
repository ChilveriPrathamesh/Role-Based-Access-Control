const pool = require('../config/db');


//GET API to fetch all candidates from the Database
const getAllCandidates = async () => {
    try{
        const [rows] = await pool.query('SELECT * FROM candidates');
        return rows;
    } catch (error) {
        throw new Error('Error fetching candidates from database: ' + error.message)
    }
};

//POST API to add a new candidate to the Database
const addCandidate = async (candidate) => {
    try {
        const {name , email ,phone_number , current_status , resume_link} = candidate

        const [result] = await pool.query(
        'INSERT INTO candidates (name , email , phone_number , current_status , resume_link) VALUES (?,?,?,?,?)',
        [name , email , phone_number , current_status , resume_link]
        )
        return {id : result.insertId , ...candidate};
    } catch (error) {
        throw new ERROR('Error adding candidate to database: ' + error.message);
    }
}

// PUT API to update an existing candidate in the Database 
const updateCandidate = async (id , candidate) => {
    try{
        const {name , email , phone_number , current_status , resume_link} = candidate

        const [result] = await pool.query(
            'UPDATE candidates SET name = ? , email = ? , phone_number = ? , current_status=? , resume_link = ? WHERE id = ?' , 
            [name , email , phone_number , current_status , resume_link , id]  
        ) ;

        if(result.affectedRows === 0) {
            throw new Error(`No candidate found with the given ID ${id}`)
        }

        return { id , ...candidate}
    } catch (error) {
        throw new Error('Error updating candidate in database: ' + error.message);
    }
}

// DELETE API to remove a candidate from the Database 
const deleteCandidate = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM candidates WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      throw new Error(`No candidate found with id ${id}`);
    }

    return { message: 'Candidate deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting candidate: ' + error.message);
  }
};

//Check if a candidate exists by ID 
const candidateExists = async(candidateId) => {
    try {
        const [rows] = await pool.query(
            `SELECT id, name, email FROM candidates WHERE id = ?`,
            [candidateId]
            );

        return rows ;
    } catch(error) {
        throw new Error('Error to get the candidate details : ' + error.message) 
    }
}

module.exports =  {
    getAllCandidates ,
    addCandidate ,
    updateCandidate ,
    deleteCandidate ,
    candidateExists
} ;
