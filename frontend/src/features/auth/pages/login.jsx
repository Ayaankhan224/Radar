import React, { useState } from "react";
import Button from "../../../components/Button"
import { Link } from "react-router";


const login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e)=>{
    e.preventDefault()
  }

  return (
    <div className="h-screen w-screen flex">
      <div className="w-[40%]">
        <img src="/login.jpeg" className="h-full w-full object-cover"/>
      </div>
      <div className="flex-1 bg-[#f9f5d2] flex justif-center items-center">
        <div className="w-[90%] h-[90%] flex flex-col gap-12 justify-center items-center">
          <h1 className="text-zinc-800 text-9xl uppercase font-mono tracking-tight font-bold">Login</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-[80%]">
            <label htmlFor="email" className="text-zinc-800 text-2xl font-sans tracking-tight font-bold">Enter email</label>

            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="abc@example.com" className="bg-zinc-300 opacity-50 text-gray-700 rounded-full p-4"/>

            <label htmlFor="password" className="text-zinc-800 text-2xl font-sans tracking-tight font-bold">Enter password</label>

            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="*********" className="bg-zinc-300 opacity-50 text-gray-700 rounded-full p-4"/>
            <button className="mt-10"><Button name='Log In'/></button>
          </form>

          <p className="-mt-8">Don't have an account? <Link to={"/register"} className='text-blue-600'>Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default login;
