const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const resumeController = require('../controllers/resume.controller')

const resumeRouter = express.Router()

/**
 * @route POST /api/resume/generate
 * @description Generate resume PDF from form data
 * @access Private
 */
resumeRouter.post('/generate', authMiddleware.authUser, resumeController.generateResumeController)

/**
 * @route GET /api/resume/:resumeId
 * @description Get resume by resumeId
 * @access Private
 */
resumeRouter.get('/:resumeId', authMiddleware.authUser, resumeController.getResumeByIdController)

/**
 * @route DELETE /api/resume/:resumeId
 * @description Delete resume by resumeId
 * @access Private
 */
resumeRouter.delete('/:resumeId', authMiddleware.authUser, resumeController.deleteResumeController)

/**
 * @route GET /api/resume
 * @description Get all resumes of the logged-in user
 * @access Private
 */
resumeRouter.get('/', authMiddleware.authUser, resumeController.getAllResumesController)

/**
 * @route GET /api/resume/:resumeId/download
 * @description Download resume PDF
 * @access Private
 */
resumeRouter.get('/:resumeId/download', authMiddleware.authUser, resumeController.downloadResumePdfController)

module.exports = resumeRouter
