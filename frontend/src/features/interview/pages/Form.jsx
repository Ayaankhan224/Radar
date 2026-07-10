import React, {useState, useRef} from 'react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router'

const Form = () => {
  
  const { generateReport, loading } = useInterview()
  const [selfDescription, setSelfDescription] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const resumeInputRef = useRef(null)
  const navigate = useNavigate()

  const handleGenerateReport = async (e) => {
    e.preventDefault()
    const resumeFile = resumeInputRef.current.files[0]
    const data = await generateReport({ jobDescription, selfDescription, resumeFile })
    navigate(`/interview/${data._id}`)
  }

  return (
    <div className='flex h-screen w-screen bg-[#f9f5d2] p-4'>
      <div className='hidden md:block flex-[1.05] rounded-l-4xl overflow-hidden'>
        <img className='w-full h-full object-fill' src="/formgradient.jpeg" alt="Form Gradient" />
      </div>
      <div id='form' className='flex-[0.95] bg-zinc-800 rounded-4xl md:rounded-l-none md:rounded-r-4xl flex items-center justify-center px-6 py-8'>
        <form className='w-full max-w-2xl h-full flex flex-col justify-center gap-5' encType='multipart/form-data'>
          <div className='mb-2'>
            <p className='text-[#f9f5d2] text-sm uppercase tracking-[0.2em] font-semibold'>Form Prep</p>
            <h1 className='text-white text-5xl font-mono font-bold tracking-tight mt-2'>Build your report</h1>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='selfDescription' className='text-[#f9f5d2] text-xl font-sans tracking-tight font-bold'>Self Description</label>
            <textarea
              onChange={(e) => setSelfDescription(e.target.value)}
              id='selfDescription'
              name='selfDescription'
              rows='5'
              placeholder='Tell us about your experience, strengths, goals, and the kind of roles you are targeting.'
              className='w-full resize-none rounded-3xl bg-zinc-900/80 border border-[#f9f5d2]/20 text-white placeholder:text-zinc-500 p-5 outline-none focus:border-[#f9f5d2] focus:bg-zinc-900 transition'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='jobDescription' className='text-[#f9f5d2] text-xl font-sans tracking-tight font-bold'>Job Description</label>
            <textarea
              onChange={(e) => setJobDescription(e.target.value)}
              id='jobDescription'
              name='jobDescription'
              rows='5'
              placeholder='Paste the job description, responsibilities, required skills, and preferred qualifications.'
              className='w-full resize-none rounded-3xl bg-zinc-900/80 border border-[#f9f5d2]/20 text-white placeholder:text-zinc-500 p-5 outline-none focus:border-[#f9f5d2] focus:bg-zinc-900 transition'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='resume' className='text-[#f9f5d2] text-xl font-sans tracking-tight font-bold'>Resume PDF</label>
            <input
              ref={resumeInputRef}
              id='resume'
              name='resume'
              type='file'
              accept='application/pdf'
              className='w-full rounded-full bg-zinc-900/80 border border-[#f9f5d2]/20 text-zinc-300 file:mr-5 file:border-0 file:bg-[#f9f5d2] file:text-zinc-800 file:font-bold file:px-6 file:py-4 file:rounded-full file:cursor-pointer p-1 outline-none focus:border-[#f9f5d2] transition'
            />
          </div>

          <button disabled={loading} onClick={handleGenerateReport} type='submit' className='mt-4 bg-[#f9f5d2] text-zinc-900 py-4 px-10 text-[1.1rem] rounded-full font-bold hover:bg-[#f4edd0] hover:scale-[1.02] active:scale-[0.99] transition ease-in-out cursor-pointer select-none'>
            {loading ? "Loading...(this may take some time)" : "Generate Report"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Form
