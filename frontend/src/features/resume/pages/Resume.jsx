import React, { useState } from 'react'
import { useResume } from '../hooks/useResume'
import { useNavigate } from 'react-router-dom'
import '../../interview/pages/Form.css'

const Resume = () => {
  const { generateNewResume, loading } = useResume()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
    projects: ''
  })

  const handleChange = (e) => {
    setError('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const result = await generateNewResume(formData)
      if (result?._id) {
        navigate(`/resume/${result._id}`)
      } else {
        setError('Resume generated, but no resume id was returned. Please try again.')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className='flex h-screen w-screen bg-[#f9f5d2] p-4'>
      <div className='hidden md:block flex-[1.05] rounded-l-4xl overflow-hidden relative'>
        <img className='w-full h-full object-fill' src="/resumebg.jpg" alt="Resume Gradient" />
        <div className='absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent' />
        <div className='absolute bottom-8 left-8 right-8'>
          <p className='text-[#f9f5d2] text-sm uppercase tracking-[0.2em] font-semibold mb-2'>Resume Builder</p>
          <h2 className='text-white text-4xl font-mono font-bold tracking-tight'>Create your professional resume</h2>
        </div>
      </div>

      <div className='flex-[0.95] bg-zinc-800 rounded-4xl md:rounded-l-none md:rounded-r-4xl flex items-center justify-center px-6 py-8 overflow-hidden'>
        <form className='form-scroll w-full max-w-2xl h-full flex flex-col justify-start gap-4 overflow-y-auto min-h-0 py-2' onSubmit={handleSubmit}>
          <div className='mb-2'>
            <p className='text-[#f9f5d2] text-sm uppercase tracking-[0.2em] font-semibold'>Resume Builder</p>
            <h1 className='text-white text-5xl font-mono font-bold tracking-tight mt-2'>Build your resume</h1>
          </div>

          {/* Personal Information */}
          <div className='flex flex-col gap-2'>
            <label htmlFor='fullName' className='text-[#f9f5d2] text-xl font-sans tracking-tight font-bold'>Full Name</label>
            <input
              onChange={handleChange}
              id='fullName'
              name='fullName'
              type='text'
              placeholder='John Doe'
              value={formData.fullName}
              className='w-full rounded-full bg-zinc-900/80 border border-[#f9f5d2]/20 text-white placeholder:text-zinc-500 p-4 outline-none focus:border-[#f9f5d2] focus:bg-zinc-900 transition'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='email' className='text-[#f9f5d2] text-xl font-sans tracking-tight font-bold'>Email</label>
              <input
                onChange={handleChange}
                id='email'
                name='email'
                type='email'
                placeholder='john@example.com'
                value={formData.email}
                className='w-full rounded-full bg-zinc-900/80 border border-[#f9f5d2]/20 text-white placeholder:text-zinc-500 p-4 outline-none focus:border-[#f9f5d2] focus:bg-zinc-900 transition'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='phone' className='text-[#f9f5d2] text-xl font-sans tracking-tight font-bold'>Phone</label>
              <input
                onChange={handleChange}
                id='phone'
                name='phone'
                type='tel'
                placeholder='+1 234 567 890'
                value={formData.phone}
                className='w-full rounded-full bg-zinc-900/80 border border-[#f9f5d2]/20 text-white placeholder:text-zinc-500 p-4 outline-none focus:border-[#f9f5d2] focus:bg-zinc-900 transition'
              />
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='location' className='text-[#f9f5d2] text-xl font-sans tracking-tight font-bold'>Location</label>
            <input
              onChange={handleChange}
              id='location'
              name='location'
              type='text'
              placeholder='San Francisco, CA'
              value={formData.location}
              className='w-full rounded-full bg-zinc-900/80 border border-[#f9f5d2]/20 text-white placeholder:text-zinc-500 p-4 outline-none focus:border-[#f9f5d2] focus:bg-zinc-900 transition'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='linkedin' className='text-[#f9f5d2] text-xl font-sans tracking-tight font-bold'>LinkedIn Profile</label>
            <input
              onChange={handleChange}
              id='linkedin'
              name='linkedin'
              type='url'
              placeholder='https://linkedin.com/in/yourprofile'
              value={formData.linkedin}
              className='w-full rounded-full bg-zinc-900/80 border border-[#f9f5d2]/20 text-white placeholder:text-zinc-500 p-4 outline-none focus:border-[#f9f5d2] focus:bg-zinc-900 transition'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='summary' className='text-[#f9f5d2] text-xl font-sans tracking-tight font-bold'>Professional Summary</label>
            <textarea
              onChange={handleChange}
              id='summary'
              name='summary'
              rows='4'
              placeholder='Brief overview of your professional background and career goals.'
              value={formData.summary}
              className='w-full resize-none rounded-3xl bg-zinc-900/80 border border-[#f9f5d2]/20 text-white placeholder:text-zinc-500 p-5 outline-none focus:border-[#f9f5d2] focus:bg-zinc-900 transition'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='experience' className='text-[#f9f5d2] text-xl font-sans tracking-tight font-bold'>Work Experience</label>
            <textarea
              onChange={handleChange}
              id='experience'
              name='experience'
              rows='5'
              placeholder='List your work experience with company names, roles, dates, and key achievements.'
              value={formData.experience}
              className='w-full resize-none rounded-3xl bg-zinc-900/80 border border-[#f9f5d2]/20 text-white placeholder:text-zinc-500 p-5 outline-none focus:border-[#f9f5d2] focus:bg-zinc-900 transition'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='education' className='text-[#f9f5d2] text-xl font-sans tracking-tight font-bold'>Education</label>
            <textarea
              onChange={handleChange}
              id='education'
              name='education'
              rows='4'
              placeholder='List your educational background with degrees, institutions, and graduation dates.'
              value={formData.education}
              className='w-full resize-none rounded-3xl bg-zinc-900/80 border border-[#f9f5d2]/20 text-white placeholder:text-zinc-500 p-5 outline-none focus:border-[#f9f5d2] focus:bg-zinc-900 transition'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='skills' className='text-[#f9f5d2] text-xl font-sans tracking-tight font-bold'>Skills</label>
            <textarea
              onChange={handleChange}
              id='skills'
              name='skills'
              rows='3'
              placeholder='List your technical and soft skills (e.g., JavaScript, React, Project Management).'
              value={formData.skills}
              className='w-full resize-none rounded-3xl bg-zinc-900/80 border border-[#f9f5d2]/20 text-white placeholder:text-zinc-500 p-5 outline-none focus:border-[#f9f5d2] focus:bg-zinc-900 transition'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='projects' className='text-[#f9f5d2] text-xl font-sans tracking-tight font-bold'>Projects (Optional)</label>
            <textarea
              onChange={handleChange}
              id='projects'
              name='projects'
              rows='4'
              placeholder='Highlight key projects with descriptions and technologies used.'
              value={formData.projects}
              className='w-full resize-none rounded-3xl bg-zinc-900/80 border border-[#f9f5d2]/20 text-white placeholder:text-zinc-500 p-5 outline-none focus:border-[#f9f5d2] focus:bg-zinc-900 transition'
            />
          </div>

          <div className='mt-4 flex gap-4'>
            <button
              type='button'
              onClick={() => setFormData({
                fullName: '',
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                summary: '',
                experience: '',
                education: '',
                skills: '',
                projects: ''
              })}
              disabled={loading}
              className='flex-1 border border-[#f9f5d2]/20 bg-zinc-900/80 text-[#f9f5d2] py-4 px-10 text-[1.1rem] rounded-full font-bold hover:bg-zinc-900 hover:border-[#f9f5d2] hover:scale-[1.02] active:scale-[0.99] transition ease-in-out cursor-pointer select-none'
            >
              Clear Form
            </button>
            <button
              type='submit'
              disabled={loading}
              className='flex-1 bg-[#f9f5d2] text-zinc-900 py-4 px-10 text-[1.1rem] rounded-full font-bold hover:bg-[#f4edd0] hover:scale-[1.02] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100 transition ease-in-out cursor-pointer select-none'
            >
              {loading ? "Generating Resume..." : "Generate Resume"}
            </button>
          </div>

          {error && (
            <p className='rounded-2xl border border-red-300/30 bg-red-950/40 px-4 py-3 text-sm font-semibold text-red-100'>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Resume
