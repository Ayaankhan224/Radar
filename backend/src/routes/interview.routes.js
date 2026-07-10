const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const interviewController = require('../controllers/interview.controller')
const upload = require('../middlewares/file.middleware')

const interviewRouter = express.Router()

/**
 * @route POST /api/interview
 * @description Generate new interview report on the basis of resume, userdesc, jobdesc
 * @access Private
 */
interviewRouter.post('/', authMiddleware.authUser, upload.single('resume'), interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description Get interview report by interviewId
 * @access Private
 */
interviewRouter.get('/report/:interviewId', authMiddleware.authUser, interviewController.getInterviewReportByIdController)

/**
 * @route DELETE /api/interview/report/:interviewId
 * @description Delete interview report by interviewId
 * @access Private
 */
interviewRouter.delete('/report/:interviewId', authMiddleware.authUser, interviewController.deleteInterviewReportController)


/**
 * @route GET /api/interview/
 * @description Get all interview reports of the logged-in user
 * @access Private
 */
interviewRouter.get('/', authMiddleware.authUser, interviewController.getAllInterviewReportsController)


module.exports = interviewRouter
