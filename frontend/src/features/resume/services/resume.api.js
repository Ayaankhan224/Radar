import axios from 'axios'
import { API_BASE_URL } from '../../../config/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 180000
})

function getErrorMessage(err, fallbackMessage) {
  if (err.code === 'ECONNABORTED') {
    return 'The request took too long. Please try again.'
  }

  return err.response?.data?.message || fallbackMessage
}

/**
 * @description Generate resume PDF from form data
 */
export const generateResume = async (formData) => {
  try {
    const response = await api.post('/api/resume/generate', formData)

    return response.data
  } catch (err) {
    throw new Error(getErrorMessage(err, 'Failed to generate resume'))
  }
}

/**
 * @description Get all resumes of the logged-in user
 */
export const getAllResumes = async () => {
  try {
    const response = await api.get('/api/resume')
    return response.data
  } catch (err) {
    throw new Error(getErrorMessage(err, 'Failed to fetch resumes'))
  }
}

/**
 * @description Get resume by resumeId
 */
export const getResumeById = async (resumeId) => {
  try {
    const response = await api.get(`/api/resume/${resumeId}`)
    return response.data
  } catch (err) {
    throw new Error(getErrorMessage(err, 'Failed to fetch resume'))
  }
}

/**
 * @description Delete resume by resumeId
 */
export const deleteResume = async (resumeId) => {
  try {
    const response = await api.delete(`/api/resume/${resumeId}`)
    return response.data
  } catch (err) {
    throw new Error(getErrorMessage(err, 'Failed to delete resume'))
  }
}

/**
 * @description Download resume PDF
 */
export const downloadResumePdf = async (resumeId) => {
  try {
    const response = await api.get(`/api/resume/${resumeId}/download`, {
      responseType: 'blob'
    })

    return response.data
  } catch (err) {
    throw new Error(getErrorMessage(err, 'Failed to download resume PDF'))
  }
}
