const express = require("express");
const {
  getJobs,
  getJobsById,
  createJob,
  editJob,
  removeJob,
  checkJobExists,
} = require("../controllers/jobController.js");

const { authenticateJWT } = require('../middleware/auth.js');
const { authorizeRoles } = require('../middleware/roleCheck.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job Management APIs
 */

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: List of all jobs (varies by role)
 *       500:
 *         description: Server error
 */
router.get("/", authenticateJWT, authorizeRoles("Admin", "Recruiter", "Hiring Manager"), getJobs);

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
router.get("/:id", authenticateJWT, authorizeRoles("Admin", "Recruiter", "Hiring Manager"), getJobsById);

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
 *             required:
 *               - title
 *               - description
 *               - required_skills
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               required_skills:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Missing required fields
 */
router.post("/", authenticateJWT, authorizeRoles("Admin", "Recruiter"), createJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Update an existing job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - required_skills
 *               - recruiter_id
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               required_skills:
 *                 type: string
 *               recruiter_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Job updated successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Job not found
 */
router.put("/:id",authenticateJWT,authorizeRoles("Admin" , "Recruiter"), editJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Job not found
 */
router.delete("/:id",authenticateJWT , authorizeRoles("Admin"), removeJob);

/**
 * @swagger
 * /api/jobs/{id}/exists:
 *   get:
 *     summary: Check if a job exists
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job exists
 *       404:
 *         description: Job not found
 */
// Check if a job exists (must come BEFORE /:id)
router.get("/:id/exists", authenticateJWT, authorizeRoles("Admin", "Recruiter"), checkJobExists);

module.exports = router;
