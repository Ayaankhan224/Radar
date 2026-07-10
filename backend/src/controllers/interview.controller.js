const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')

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

module.exports = {
  generateInterviewReportController
}
