import React, {useState} from 'react'
import Button from "../../../components/Button"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const register = () => {

  const {loading, handleRegister} = useAuth()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    await handleRegister({username, email, password})
    navigate('/')  
  }

  if(loading){
    return (
    <div className="h-screen w-screen flex">
      <div className="flex-1 bg-[#f4edd0] flex justify-center items-center">
        <div className="w-[90%] h-[90%] flex flex-col gap-12 justify-center items-center">
          <h1 className="text-zinc-800 text-9xl uppercase font-mono tracking-tight font-bold">Register</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-[80%]">
            <label htmlFor="username" className="text-zinc-800 text-2xl font-sans tracking-tight font-bold">Enter email</label>

            <input disabled onChange={(e)=>{setUsername(e.target.value)}} type="text" placeholder="John Pork" className="bg-zinc-300 opacity-50 text-gray-700 rounded-full p-4"/>
            
            <label htmlFor="email" className="text-zinc-800 text-2xl font-sans tracking-tight font-bold">Enter email</label>

            <input disabled onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="abc@example.com" className="bg-zinc-300 opacity-50 text-gray-700 rounded-full p-4"/>

            <label htmlFor="password" className="text-zinc-800 text-2xl font-sans tracking-tight font-bold">Enter password</label>

            <input disabled onChange={(e)=>{setPassword(e.target.value)}} type="text" placeholder="*********" className="bg-zinc-300 opacity-50 text-gray-700 rounded-full p-4"/>
          
            <button className="mt-10"><Button name='Register'/></button>
          </form>

          <p className="-mt-8">Already have an account? <Link to={"/login"} className='text-blue-600'>Login</Link></p>
        </div>
      </div>
      <div className="w-[40%]">
        <img src="/register.png" className="h-full w-full object-cover"/>
      </div>
    </div>
  )
  }
  else{
    return (
      <div className="h-screen w-screen flex">
        <div className="flex-1 bg-[#f4edd0] flex justify-center items-center">
          <div className="w-[90%] h-[90%] flex flex-col gap-12 justify-center items-center">
            <h1 className="text-zinc-800 text-9xl uppercase font-mono tracking-tight font-bold">Register</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-[80%]">
              <label htmlFor="username" className="text-zinc-800 text-2xl font-sans tracking-tight font-bold">Enter email</label>

              <input onChange={(e)=>{setUsername(e.target.value)}} type="text" placeholder="John Pork" className="bg-zinc-300 opacity-50 text-gray-700 rounded-full p-4"/>
            
              <label htmlFor="email" className="text-zinc-800 text-2xl font-sans tracking-tight font-bold">Enter email</label>

              <input onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="abc@example.com" className="bg-zinc-300 opacity-50 text-gray-700 rounded-full p-4"/>

              <label htmlFor="password" className="text-zinc-800 text-2xl font-sans tracking-tight font-bold">Enter password</label>

              <input onChange={(e)=>{setPassword(e.target.value)}} type="text" placeholder="*********" className="bg-zinc-300 opacity-50 text-gray-700 rounded-full p-4"/>
          
              <button className="mt-10"><Button name='Register'/></button>
            </form>

            <p className="-mt-8">Already have an account? <Link to={"/login"} className='text-blue-600'>Login</Link></p>
          </div>
        </div>
        <div className="w-[40%]">
          <img src="/register.png" className="h-full w-full object-cover"/>
        </div>
      </div>
    )
  }
}

export default register