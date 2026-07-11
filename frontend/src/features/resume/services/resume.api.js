import axios from 'axios'
import { API_BASE_URL } from '../../../config/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
})

/**
 * @description Generate resume PDF from form data
 */
export const generateResume = async (formData) => {
  const response = await api.post('/api/resume/generate', formData)

  return response.data
}

/**
 * @description Get all resumes of the logged-in user
 */
export const getAllResumes = async () => {
  const response = await api.get('/api/resume')
  return response.data
}

/**
 * @description Get resume by resumeId
 */
export const getResumeById = async (resumeId) => {
  const response = await api.get(`/api/resume/${resumeId}`)
  return response.data
}

/**
 * @description Delete resume by resumeId
 */
export const deleteResume = async (resumeId) => {
  const response = await api.delete(`/api/resume/${resumeId}`)
  return response.data
}

/**
 * @description Download resume PDF
 */
export const downloadResumePdf = async (resumeId) => {
  const response = await api.get(`/api/resume/${resumeId}/download`, {
    responseType: 'blob'
  })

  return response.data
}
