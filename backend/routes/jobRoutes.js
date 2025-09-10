const express = require('express') ;

const {getJobs , getJobsById , createJob ,  editJob ,  removeJob} = require('../controllers/jobController.js') 

const router = express.Router();

/**
 * @swagger
 * tags :
 *   name : Jobs 
 *   description : Job Management APIs
 */

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all Jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of all jobs
 */
router.get('/' , getJobs)

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Get a job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path 
 *         name: id 
 *         required: true 
 *         schema:
 *           type: integer
 *         description: The job ID 
 *     responses:
 *       200:
 *         description: Job details
 *       404:
 *         description: Job not found
 */
router.get('/:id', getJobsById)

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               required_skills:
 *                 type: string
 *               recruiter_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job Created Successfully
 */
router.post('/' , createJob)

/**
 * @swagger
 * /api/jobs/{id}:
 *  put:
 *    summary: Update an existing job
 *    tags: [Jobs]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title: { type: string }
 *              description: { type: string }
 *              required_skills: { type: string }
 *              recruiter_id: { type: integer }
 *    responses:
 *      201:
 *        description: Job updated successfully
 */
router.put('/:id', editJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *    delete :
 *      summary : Delete a Job
 *      tags : [Jobs]
 *      parameters :
 *        - in : path 
 *          name : id 
 *          required : true 
 *          schema :
 *             type : integer 
 *      responses :
 *        200 :
 *          description : Job deleted successfully 
 */
router.delete('/:id' , removeJob)
module.exports = router ;