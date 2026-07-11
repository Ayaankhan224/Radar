import axios from 'axios'
import { API_BASE_URL } from '../../../config/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
})

function getErrorMessage(err, fallbackMessage) {
  return err.response?.data?.message || fallbackMessage
}

export async function register({username, email, password}) {
  
  try{
    const response = await api.post(`/api/auth/register`,{
      username, email, password
    })
    return response.data 
  }catch(err){
    throw new Error(getErrorMessage(err, 'Registration failed'))
  }

}

export async function login({email, password}){

  try{
    const response = await api.post(`/api/auth/login`,{
      email, password   
    })
    return response.data
  }catch(err){
    throw new Error(getErrorMessage(err, 'Login failed'))
  }

}

export async function logout(){
  try{
    const response = await api.get(`/api/auth/logout`)
    return response.data
  }catch(err){
    throw new Error(getErrorMessage(err, 'Logout failed'))
  }

}

export async function getMe(){
  try{
    const response = await api.get(`/api/auth/get-me`)
    return response.data
  }catch(err){
    if (err.response?.status === 401) {
      return null
    }

    throw new Error(getErrorMessage(err, 'Could not fetch user details'))
  }
}

export default getMe
