import axios from 'axios'
import { API_BASE_URL } from '../../../config/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
})
/**
 * @description Generate new interview report on the basis of resume, userdesc, jobdesc
 */
export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {
  const formData = new FormData()
  formData.append('jobDescription', jobDescription)
  formData.append('selfDescription', selfDescription)
  formData.append('resume', resumeFile)

  const response = await api.post('/api/interview', formData, {
  })

  return response.data
}

/**
 * @description Get interview report by interviewId
 */
export const getInterviewReportById = async (interviewId) => {
  const response = await api.get(`/api/interview/report/${interviewId}`)
  return response.data
}


/**
 * @description Get all interview reports of the logged-in user
 */
export const getAllInterviewReports = async () => {
  const response = await api.get('/api/interview')
  return response.data
}

/**
 * @description Delete interview report by interviewId
 */
export const deleteInterviewReport = async (interviewId) => {
  const response = await api.delete(`/api/interview/report/${interviewId}`)
  return response.data
}

/**
 * @description Download resume PDF for an interview report
 */
export const generateResumePdf = async ({ interviewReportId }) => {
  const response = await api.get(`/api/interview/report/${interviewReportId}/resume`, {
    responseType: 'blob'
  })

  return response.data
}
