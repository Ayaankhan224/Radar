const generateResumeHtml = require('../services/resumeAi.service')
const resumeModel = require('../models/resume.model')
const puppeteer = require('puppeteer')

function getPuppeteerLaunchOptions() {
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath()

  return {
    headless: 'new',
    executablePath,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-zygote',
      '--single-process'
    ]
  }
}

/**
 * @function generateResumeController
 * @description Generate resume PDF from form data
 */
async function generateResumeController(req, res) {
  try {
    const { fullName, email, phone, location, linkedin, summary, experience, education, skills, projects } = req.body

    if (!fullName || !email) {
      return res.status(400).json({
        message: "Full name and email are required"
      })
    }

    const resumeHtml = await generateResumeHtml({
      fullName,
      email,
      phone,
      location,
      linkedin,
      summary,
      experience,
      education,
      skills,
      projects
    })

    const resume = await resumeModel.create({
      user: req.user.id,
      fullName,
      email,
      phone,
      location,
      linkedin,
      summary,
      experience,
      education,
      skills,
      projects,
      htmlContent: resumeHtml.html
    })

    return res.status(201).json({
      message: "Resume generated successfully",
      resume
    })
  } catch (error) {
    console.error('Resume generation error:', error)
    return res.status(500).json({
      message: "Failed to generate resume",
      error: error.message
    })
  }
}

/**
 * @description Get resume by resumeId
 */
async function getResumeByIdController(req, res) {
  const { resumeId } = req.params

  const resume = await resumeModel.findOne({ _id: resumeId, user: req.user.id })
  
  if (!resume) {
    return res.status(404).json({
      message: "Resume not found"
    })
  }

  return res.status(200).json({
    message: "Resume fetched successfully",
    resume
  })
}

/**
 * @description Get all resumes of the logged-in user
 */
async function getAllResumesController(req, res) {
  const resumes = await resumeModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select('-htmlContent -__v')

  return res.status(200).json({
    message: "Resumes fetched successfully",
    resumes
  })
}

/**
 * @description Delete resume by resumeId
 */
async function deleteResumeController(req, res) {
  const { resumeId } = req.params

  const resume = await resumeModel.findOneAndDelete({ _id: resumeId, user: req.user.id })

  if (!resume) {
    return res.status(404).json({
      message: "Resume not found"
    })
  }

  return res.status(200).json({
    message: "Resume deleted successfully"
  })
}

/**
 * @description Download resume PDF
 */
async function downloadResumePdfController(req, res) {
  let browser

  try {
    const { resumeId } = req.params

    const resume = await resumeModel.findOne({ _id: resumeId, user: req.user.id })

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      })
    }

    browser = await puppeteer.launch(getPuppeteerLaunchOptions())
    const page = await browser.newPage()

    await page.setContent(resume.htmlContent, {
      waitUntil: 'load',
      timeout: 60000
    })

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.3cm',
        right: '0.3cm',
        bottom: '0.3cm',
        left: '0.3cm'
      },
      preferCSSPageSize: true
    })

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="resume_${resume.fullName.replace(/\s+/g, '_')}.pdf"`)
    res.send(pdfBuffer)
  } catch (error) {
    console.error('PDF generation error:', error)
    return res.status(500).json({
      message: "Failed to generate PDF",
      error: error.message
    })
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

module.exports = {
  generateResumeController,
  getResumeByIdController,
  getAllResumesController,
  deleteResumeController,
  downloadResumePdfController
}
