const pool = require('../config/db.js')

// Find user by email
const findByEmail = async (email) => {
 try {
    const [rows] = await pool.query(
        `SELECT * FROM users WHERE email = ?` , [email] 
    ) ;
    return rows[0] || null ;
 } catch (error) {
    console.error('Error fetching user by email :' , error.message) ;
    throw new Error('Database error while fetching user by email') ;
 }
}

// Find user by ID 
const findById = async (id) => {
    try {
        const [rows] = await pool.query(`
                SELECT id , email , role , created_at FROM users WHERE id = ?
            ` , [id]);
        return rows[0] || null ;
    } catch(error) {
        console.log('Error fetching user by ID :' , error.message);
        throw new Error('Database error whie fetching user by ID');
    }
}

// Create new user 
const createUser = async ({email , passwordHash , role}) => {
    try {
        const [result]  = await pool.query(`
                INSERT INTO users (email , password_hash , role) VALUES (?,?,?)
            ` , [email , passwordHash , role])
            return {id : result.insertId , email , role}
    } catch (error) {
        console.error('Error creating user :' , error.message) ;
        throw new Error('Database error while creating user') ;
    }
};

//Check if user exists 
const userExists = async (email) => {
    try {
        const [result] = await pool.query(`
                SELECT id , email FROM users WHERE email = ? 
            `,[email]
        ) ;
        return result[0] || null
    } catch(error)  {
        console.error('Error checking if user exists :' , error.message) ;
        throw new Error('Database error while checking user existence') ;
    }
}

// Get all users 

const getUsers = async() => {
    try {
        const [rows] = await pool.query(`
                SELECT * FROM users            
            `)
            return rows
    } catch(error ) {
        console.error('Error getting all users :' , error.message) ;
        throw new Error('Database error getting users');
    }
}

module.exports = {
    findByEmail , 
    findById ,
    createUser , 
    userExists , 
    getUsers
}