const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel.js')

const dotenv = require('dotenv')

dotenv.config()

const SALT_ROUNDS = 10 ;

const register = async (req, res) => {
    try {
        const {email , password , role} = req.body;
        if(!email ||!password || !role) {
            return res.status(400).json({message : 'Missing required details'});
        }
        const existing = await User.findByEmail(email ) ;
        if(existing) {
            return res.status(409).json({message : 'User already exists'}) ;
        } 

        const passwordHash = await bcrypt.hash(password,SALT_ROUNDS);
        const id = await User.createUser({email , passwordHash , role}) ;
        return res.status(201).json({
            id ,
            email ,
            role,
            message : 'Successfully registered'
        }) ;
    }
    catch(error) {
        console.error('Failed to register' , error.message) ;
        res.status(500).json({message : 'Server issue at register'}) ;
    }
}

const login =  async (req, res) => {
    try {
        const {email , password} = req.body ;
        if(!email || !password) {
            return res.status(400).json({message : 'Email and Password required'}) ;
        }

        //Check the user existence
        const user = await User.findByEmail(email) ;
        if(!user) {
            return res.status(401).json({message : 'Invalid Credentials'}) ;
        }

        // Password verification
        const match = await bcrypt.compare(password , user.password_hash) ;
        if(!match) {
            return res.status(401).json({message : 'Enter Correct Password'}) ;
        } 

        const payload = {id : user.id , role : user.role , email : user.email} ;

        const token = jwt.sign(payload , process.env.JWT_SECRET,{expiresIn : process.env.JWT_EXPIRES_IN})

        return res.json({
            token,
            user : {
               id : user.id ,
                email : user.email ,
                role : user.role
            }
        })

    } catch (error) {
        console.error('Failed to login') ;
        res.status(500).json({message : 'Server issue in login'});
    }
}

//Get user details 

const getAllUsers = async(req, res) => {
    try {
        //Only Admin should see ALL users 
        if(req.user.role !== 'Admin') {
            return res.status(403).json({message : 'Forbidden : Only Admin can access all users'})
        }
        const result = await User.getUsers();
        return result;
    } catch(error) {
        console.error('Failed to get user details') ;
        res.status(500).json({message:'Server error to get user details'})
    }
}

//All users can fetch their own info 
const getProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) {
            return res.status(404).json({message : 'User not found'})
        }
        res.status(200).json(user)
    } catch(error) {
        console.error('Error fetching Profile :' , error.message)
        res.status(500).json({message : 'server error'})
    }
}

// GET /api/users?role=HR
const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.query;
    if (!role) return res.status(400).json({ message: "Role is required" });

    const users = await User.getUsersByRole(role);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
    register,
    login ,
    getAllUsers ,
    getProfile,
    getUsersByRole
}