import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const login = () => {
  const { loading, handleLogin } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleLogin({ email, password })
    navigate('/')
  }

  return (
    <div className="flex h-screen w-screen bg-[#f9f5d2] p-4">
      <div className="hidden md:block flex-[1.05] rounded-l-4xl overflow-hidden">
        <img src="/login.jpeg" className="h-full w-full object-cover" alt="Login" />
      </div>

      <div className="flex-[0.95] bg-zinc-800 rounded-4xl md:rounded-l-none md:rounded-r-4xl flex items-center justify-center px-6 py-8">
        <form onSubmit={handleSubmit} className="w-full max-w-xl h-full flex flex-col justify-center gap-5">
          <div className="mb-4">
            <p className="text-[#f9f5d2] text-sm uppercase tracking-[0.2em] font-semibold">Welcome back</p>
            <h1 className="text-white text-5xl font-mono font-bold tracking-tight mt-2">Login</h1>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[#f9f5d2] text-xl font-sans tracking-tight font-bold">Email</label>
            <input
              disabled={loading}
              onChange={(e) => { setEmail(e.target.value) }}
              id="email"
              type="email"
              placeholder="abc@example.com"
              className="w-full rounded-full bg-zinc-900/80 border border-[#f9f5d2]/20 text-white placeholder:text-zinc-500 px-5 py-4 outline-none focus:border-[#f9f5d2] focus:bg-zinc-900 disabled:opacity-50 transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[#f9f5d2] text-xl font-sans tracking-tight font-bold">Password</label>
            <input
              disabled={loading}
              onChange={(e) => { setPassword(e.target.value) }}
              id="password"
              type="password"
              placeholder="********"
              className="w-full rounded-full bg-zinc-900/80 border border-[#f9f5d2]/20 text-white placeholder:text-zinc-500 px-5 py-4 outline-none focus:border-[#f9f5d2] focus:bg-zinc-900 disabled:opacity-50 transition"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="mt-4 bg-[#f9f5d2] text-zinc-900 py-4 px-10 text-[1.1rem] rounded-full font-bold hover:bg-[#f4edd0] hover:scale-[1.02] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100 transition ease-in-out cursor-pointer select-none"
          >
            {loading ? "Loading..." : "Log In"}
          </button>

          <p className="text-zinc-300 text-center">
            Don't have an account? <Link to={"/register"} className="text-[#f9f5d2] font-bold">Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default login;
