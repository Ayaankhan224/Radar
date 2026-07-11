const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')

/**
 * @function generateInterviewReportController
 * @description Generate new interview report on the basis of resume, userdesc, jobdesc
 */
async function generateInterviewReportController(req, res) {
  try {
    const resumeFile = req.file

    if (!resumeFile) {
      return res.status(400).json({
        message: "Resume PDF is required"
      })
    }

    const { selfDescription, jobDescription } = req.body

    if (!selfDescription || !jobDescription) {
      return res.status(400).json({
        message: "Self description and job description are required"
      })
    }

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer))).getText()

    const interviewReportByAi = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription
    })

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      title: interviewReportByAi.title || "Untitled Job",
      score: interviewReportByAi.matchScore,
      technicalQuestions: interviewReportByAi.technicalQuestions,
      behavioralQuestions: interviewReportByAi.behavioralQuestions,
      skillGap: interviewReportByAi.skillGaps,
      preparationPlan: interviewReportByAi.preparationPlan
    })

    return res.status(201).json({
      message: "Interview report generated successfully",
      interviewReport
    })
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate interview report",
      error: error.message
    })
  }
}

/**
 * @description Get interview report by interviewId
 */
async function getInterviewReportByIdController(req, res) {
  const { interviewId } = req.params

  const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })
  
  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found"
    })
  }

  return res.status(200).json({
    message: "Interview report fetched successfully",
    interviewReport
  })
}

/**
 * @description Get all interview reports of the logged-in user
 */
async function getAllInterviewReportsController(req, res) {
  const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select('-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGap -preparationPlan ')

  return res.status(200).json({
    message: "Interview reports fetched successfully",
    interviewReports
  })
}

/**
 * @description Delete interview report by interviewId
 */
async function deleteInterviewReportController(req, res) {
  const { interviewId } = req.params

  const interviewReport = await interviewReportModel.findOneAndDelete({ _id: interviewId, user: req.user.id })

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found"
    })
  }

  return res.status(200).json({
    message: "Interview report deleted successfully"
  })
}

module.exports = {
  generateInterviewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  deleteInterviewReportController
}
