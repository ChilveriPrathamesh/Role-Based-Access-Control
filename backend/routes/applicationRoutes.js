const express = require('express')
const router = express.Router()

const applicationController = require('../controllers/applicationController.js');
const app = require('../server.js');

/**
 * @swagger 
 * tags:
 *   name : Applications 
 *   description : API endpoints for managing job applications
 */

/**
 * @swagger
 * /api/applications:
 *   get:
 *     summary: Get all applications
 *     tags: [Applications]
 *     responses :
 *       200:
 *         description: List of all applications
 */
router.get('/' , applicationController.getAllApplications)

/**
 * @swagger
 * /api/applications/candidate/{candidateId} :
 *   get:
 *     summary : Get applications by candidate 
 *     tags : [Applications] 
 *     parameters :
 *       - in: path 
 *         name : candidateId
 *         required : true 
 *         schema :
 *           type : integer 
 *         description : Candidate ID 
 *     responses :
 *       200 :
 *         description : List of applications by candidate 
 */

router.get('/candidate/:candidateId' ,applicationController.getApplicationsByCandidate)

/**
 * @swagger
 * /api/applications/job/{jobId} :
 *   get:
 *     summary: Get applicants for a job
 *     tags: [Applications]
 *     parameters:
 *       - in: path 
 *         name: jobId 
 *         required: true 
 *         schema:
 *           type: integer 
 *         description: Job ID
 *     responses: 
 *       200:
 *         description : List of applicants for the job 
 */

router.get('/job/:jobId' , applicationController.getApplicantsForJob)

/**
 * @swagger
 * /api/applications/{jobId}/apply:
 *   post:
 *     summary: Apply to a job
 *     tags: [Applications]
 *     parameters:
 *       - in: path 
 *         name: jobId 
 *         required: true
 *         schema: 
 *           type: integer 
 *         description : Job ID 
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *             type : object
 *             required:
 *               - candidate_id
 *             properties:
 *               candidate_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Applied successfully
 *       409:
 *         description: Candidate already applied
 */
router.post('/:jobId/apply' , applicationController.applyToJob)

/**
 * @swagger
 * /api/applications/{id}/status:
 *   put:
 *     summary: Update application status
 *     tags: [Applications]
 *     parameters:
 *       - in: path 
 *         name: id
 *         required: true 
 *         schema: 
 *           type: integer
 *         description: Application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: true 
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Application status updated
 */
router.put('/:id/status' , applicationController.updateApplicationsStatus)

/**
 * @swagger
 * /api/applications/{id}:
 *   delete:
 *     summary: Delete an application 
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Application ID
 *     responses:
 *       204:
 *         description: Application Deleted
 */
router.delete('/:id',applicationController.deleteApplication)

module.exports = router