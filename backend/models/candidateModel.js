const pool = require('../config/db');


// GET API to fetch all candidates with optional filtering
const getAllCandidates = async (role, userId) => {
    try {
        let query = 'SELECT * FROM candidates';
        const params = [];

        if(role === "Hiring Manager" && userId){
            query += ' WHERE assigned_to = ?';
            params.push(parseInt(userId));
        } else if(role === "Recruiter" && userId){
            // Optionally, recruiters can see candidates they added
            query += ' WHERE recruiter_id = ?';
            params.push(parseInt(userId));
        }
        const [rows] = await pool.query(query, params);
        return rows;
    } catch (error) {
        throw new Error('Error fetching candidates: ' + error.message);
    }
};

// Get candidate by id :
const getCandidateById = async (id) => {
    try {
        const [rows] = await pool.query(`
                SELECT * FROM candidates WHERE id = ?
            `,[id])
        if(rows.length === 0) {
            throw new Error(`No candidate found with id ${id}`)
        }
        return rows[0];
    } catch(error) {
        throw new Error('Error fetching candidate:' + error.message)
    }
}

// //POST API to add a new candidate to the Database
// const addCandidate = async (candidate) => {
//     try {
//         const {name , email ,phone_number , current_status , resume_link} = candidate

//         const [result] = await pool.query(
//         'INSERT INTO candidates (name , email , phone_number , current_status , resume_link) VALUES (?,?,?,?,?)',
//         [name , email , phone_number , current_status , resume_link]
//         )
//         return {id : result.insertId , ...candidate};
//     } catch (error) {
//         throw new ERROR('Error adding candidate to database: ' + error.message);
//     }
// }

// // PUT API to update an existing candidate in the Database 
// const updateCandidate = async (id , candidate) => {
//     try{
//         const {name , email , phone_number , current_status , resume_link} = candidate

//         const [result] = await pool.query(
//             'UPDATE candidates SET name = ? , email = ? , phone_number = ? , current_status=? , resume_link = ? WHERE id = ?' , 
//             [name , email , phone_number , current_status , resume_link , id]  
//         ) ;

//         if(result.affectedRows === 0) {
//             throw new Error(`No candidate found with the given ID ${id}`)
//         }

//         return { id , ...candidate}
//     } catch (error) {
//         throw new Error('Error updating candidate in database: ' + error.message);
//     }
// }

// Add candidate
const addCandidate = async (candidate) => {
    try {
        const {name, email, phone_number, current_status, resume_link, assigned_to} = candidate;
        const [result] = await pool.query(
            'INSERT INTO candidates (name, email, phone_number, current_status, resume_link, assigned_to) VALUES (?,?,?,?,?,?)',
            [name, email, phone_number, current_status, resume_link, assigned_to || null]
        );
        return {id: result.insertId, ...candidate};
    } catch (error) {
        throw new Error('Error adding candidate: ' + error.message);
    }
};


// Update candidate (including assignment)
const updateCandidate = async (id, candidate) => {
    try {
        const {name, email, phone_number, current_status, resume_link, assigned_to} = candidate;
        const [result] = await pool.query(
            'UPDATE candidates SET name=?, email=?, phone_number=?, current_status=?, resume_link=?, assigned_to=? WHERE id=?',
            [name, email, phone_number, current_status, resume_link, assigned_to || null, id]
        );
        if(result.affectedRows === 0){
            throw new Error(`No candidate found with ID ${id}`);
        }
        return {id, ...candidate};
    } catch (error) {
        throw new Error('Error updating candidate: ' + error.message);
    }
};


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

//Assign candidate to HR
const assignCandidate = async (candidateId, assignedTo) => {
  try {
    const [result] = await pool.query(
      'UPDATE candidates SET assigned_to = ? WHERE id = ?',
      [assignedTo, candidateId]
    );
    return result;
  } catch (error) {
    throw new Error('Error assigning candidate: ' + error.message);
  }
};

module.exports =  {
    getAllCandidates ,
    getCandidateById ,
    addCandidate ,
    updateCandidate ,
    deleteCandidate ,
    candidateExists , 
    assignCandidate
} ;
