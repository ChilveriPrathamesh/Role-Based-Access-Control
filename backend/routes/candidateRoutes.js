const express = require('express');

const {getCandidates , createCandidate , editCandidate , removeCandidate , getCandidate} = require('../controllers/candidateController');

const router = express.Router() ;

/**
 * @swagger 
 * tags:
 *  name : Candidates 
 *  description : Candidate Management APIs
 */

/**
 * @swagger
 * /api/candidates:
 *  get:
 *    summary : Get all candidates 
 *    tags : [Candidates] 
 *    responses:
 *      200:
 *        description : List of all candidates 
 * 
 */
router.get('/' , getCandidates) ;

/**
 * @swagger
 * /api/candidates/{id}:
 *  get:
 *    summary: Get a candidate by ID
 *    tags: [Candidates]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Candidate fetched successfully
 *      404:
 *        description: Candidate not found
 */
router.get('/:id', getCandidate); 


/**
 * @swagger 
 * /api/candidates:
 *   post :
 *    summary : Create a new candidate 
 *    tags : [Candidates]
 *    requestBody :
 *      required : true
 *      content :
 *        application/json :
 *          schema :
 *            type : object 
 *            properties :
 *              name : {type :string}
 *              email : {type : string}
 *              phone_number : {type : string}
 *              current_status : {type : string}
 *              resume_link : {type : string}
 *    responses : 
 *      201 :
 *        description : Candidate Created Successfully 
 */
router.post('/' , createCandidate) ;

/**
 * @swagger
 * /api/candidates/{id}:
 *  put:
 *    summary : Update an existing candidate 
 *    tags : [Candidates]
 *    parameters :
 *      - in : path 
 *        name : id 
 *        required : true 
 *        schema :
 *          type : integer 
 *    requestBody :
 *      required : true 
 *      content : 
 *        application/json :
 *          schema :
 *            type : object 
 *            properties :
 *              name : {type : string}
 *              email : {type :string}
 *              phone_number : {type : string}
 *              current_status : {type : string}
 *              resume_link : {type : string}
 *    responses : 
 *      200 :
 *        description : Candidate updated succesfully 
 */
router.put('/:id' , editCandidate)

/**
 * @swagger 
 * /api/candidates/{id}:
 *    delete :
 *      summary : Delete a candidate 
 *      tags : [Candidates]
 *      parameters :
 *        - in : path
 *          name : id 
 *          required : true 
 *          schema : 
 *             type : integer
 *      responses :
 *        200 :
 *          description : Candidate deleted succssfully 
 */

router.delete('/:id',removeCandidate)

module.exports = router ;