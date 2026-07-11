import React, {useState, useRef} from 'react'
import { useInterview } from '../hooks/useInterview'
import { useNavigate } from 'react-router-dom'
import './Form.css'

const Form = () => {
  
  const { generateReport, loading, reports, deleteReport } = useInterview()
  const [selfDescription, setSelfDescription] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [error, setError] = useState('')
  const [showAllReports, setShowAllReports] = useState(false)
  const resumeInputRef = useRef(null)
  const navigate = useNavigate()

  const handleGenerateReport = async (e) => {
    e.preventDefault()
    setError('')

    const resumeFile = resumeInputRef.current?.files?.[0]

    if (!selfDescription.trim() || !jobDescription.trim()) {
      setError('Self description and job description are required.')
      return
    }

    if (!resumeFile) {
      setError('Please choose a resume PDF before generating a report.')
      return
    }

    try {
      const data = await generateReport({ jobDescription, selfDescription, resumeFile })

      if (!data?._id) {
        setError('Report generation failed. Please try again.')
        return
      }

      navigate(`/interview/${data._id}`)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Report generation failed. Please try again.')
    }
  }

  const formatReportDate = (date) => {
    if (!date) return 'Date unknown'
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleDeleteReport = async (e, reportId) => {
    e.stopPropagation()
    if (!window.confirm('Delete this report? This cannot be undone.')) return
    await deleteReport(reportId)
  }

  const reportsPanel = (
    <>
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
        <div>
          <p className='text-[#f9f5d2] text-sm uppercase tracking-[0.2em] font-semibold'>Your Reports</p>
          <h2 className='text-white text-3xl font-mono font-bold tracking-tight mt-2'>All Reports</h2>
        </div>
        <button
          type='button'
          onClick={() => setShowAllReports(false)}
          className='w-full sm:w-auto border border-[#f9f5d2]/20 bg-zinc-800 text-[#f9f5d2] py-2 px-6 rounded-full font-bold hover:border-[#f9f5d2] transition cursor-pointer select-none'
        >
          Close
        </button>
      </div>

      {reports.length === 0 ? (
        <p className='text-zinc-400 text-lg'>No reports yet.</p>
      ) : (
        <ul className='form-scroll flex flex-col gap-3 overflow-y-auto flex-1 min-h-0 pr-2'>
          {reports.map((report) => (
            <li key={report._id} className='rounded-2xl border border-[#f9f5d2]/10 bg-zinc-800 p-5'>
              <div className='flex flex-col sm:flex-row sm:items-start justify-between gap-4'>
                <button
                  type='button'
                  onClick={() => navigate(`/interview/${report._id}`)}
                  className='flex-1 text-left text-white hover:opacity-90 transition cursor-pointer'
                >
                  <p className='text-[#f9f5d2] font-semibold text-lg'>{report.title || 'Untitled Report'}</p>
                  <p className='text-zinc-400 text-sm mt-2'>{formatReportDate(report.createdAt)}</p>
                  {report.score != null && (
                    <p className='text-zinc-400 text-sm mt-1'>Match score: {report.score}%</p>
                  )}
                </button>
                <button
                  type='button'
                  onClick={(e) => handleDeleteReport(e, report._id)}
                  disabled={loading}
                  className='w-full sm:w-auto shrink-0 border border-red-400/30 text-red-300 py-2 px-4 rounded-full font-bold hover:border-red-400 hover:text-red-200 disabled:opacity-50 transition cursor-pointer select-none'
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )

  return (
    <div className='flex min-h-screen lg:h-screen w-full bg-[#f9f5d2] p-2 sm:p-4'>
      <div className='hidden lg:block flex-[1.05] rounded-l-4xl overflow-hidden relative'>
        <img className='w-full h-full object-fill' src="/formgradient.jpeg" alt="Form Gradient" />
        <aside
          className={`absolute inset-0 bg-zinc-900 flex flex-col p-8 transition-transform duration-300 ease-in-out ${showAllReports ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {reportsPanel}
        </aside>
      </div>

      <aside
        className={`lg:hidden fixed inset-y-2 sm:inset-y-4 left-2 right-2 sm:left-4 sm:right-4 z-30 bg-zinc-900 rounded-[1.75rem] sm:rounded-4xl flex flex-col p-4 sm:p-6 transition-transform duration-300 ease-in-out ${showAllReports ? 'translate-x-0' : '-translate-x-[110%]'}`}
      >
        {reportsPanel}
      </aside>
      <div id='form' className='flex-1 lg:flex-[0.95] bg-zinc-800 rounded-[1.75rem] sm:rounded-4xl lg:rounded-l-none lg:rounded-r-4xl flex flex-col px-4 sm:px-6 py-6 sm:py-8 overflow-hidden'>
        <div className='flex items-center mb-4'>
          <button
            onClick={() => navigate('/')}
            className='border border-[#f9f5d2]/20 bg-zinc-900/80 text-[#f9f5d2] py-2 px-5 sm:px-6 rounded-full font-bold hover:bg-zinc-900 hover:border-[#f9f5d2] transition cursor-pointer select-none'
          >
            ← Back
          </button>
        </div>
        <form className='form-scroll flex-1 w-full max-w-2xl flex flex-col justify-start md:justify-center gap-5 overflow-y-auto min-h-0 py-2' encType='multipart/form-data'>
          <div className='mb-2'>
            <p className='text-[#f9f5d2] text-sm uppercase tracking-[0.2em] font-semibold'>Form Prep</p>
            <h1 className='text-white text-4xl sm:text-5xl font-mono font-bold tracking-tight mt-2'>Build your report</h1>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='selfDescription' className='text-[#f9f5d2] text-lg sm:text-xl font-sans tracking-tight font-bold'>Self Description</label>
            <textarea
              onChange={(e) => {
                setSelfDescription(e.target.value)
                setError('')
              }}
              id='selfDescription'
              name='selfDescription'
              rows='5'
              placeholder='Tell us about your experience, strengths, goals, and the kind of roles you are targeting.'
              className='form-scroll w-full resize-none rounded-3xl bg-zinc-900/80 border border-[#f9f5d2]/20 text-white placeholder:text-zinc-500 p-5 outline-none focus:border-[#f9f5d2] focus:bg-zinc-900 transition'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='jobDescription' className='text-[#f9f5d2] text-lg sm:text-xl font-sans tracking-tight font-bold'>Job Description</label>
            <textarea
              onChange={(e) => {
                setJobDescription(e.target.value)
                setError('')
              }}
              id='jobDescription'
              name='jobDescription'
              rows='5'
              placeholder='Paste the job description, responsibilities, required skills, and preferred qualifications.'
              className='form-scroll w-full resize-none rounded-3xl bg-zinc-900/80 border border-[#f9f5d2]/20 text-white placeholder:text-zinc-500 p-5 outline-none focus:border-[#f9f5d2] focus:bg-zinc-900 transition'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='resume' className='text-[#f9f5d2] text-lg sm:text-xl font-sans tracking-tight font-bold'>Resume PDF</label>
            <input
              ref={resumeInputRef}
              id='resume'
              name='resume'
              type='file'
              accept='application/pdf'
              onChange={() => setError('')}
              className='w-full rounded-3xl sm:rounded-full bg-zinc-900/80 border border-[#f9f5d2]/20 text-zinc-300 file:mr-3 sm:file:mr-5 file:border-0 file:bg-[#f9f5d2] file:text-zinc-800 file:font-bold file:px-4 sm:file:px-6 file:py-3 sm:file:py-4 file:rounded-full file:cursor-pointer p-1 outline-none focus:border-[#f9f5d2] transition'
            />
          </div>

          {error && (
            <p className='rounded-2xl border border-red-300/30 bg-red-950/40 px-4 py-3 text-sm font-semibold text-red-100'>
              {error}
            </p>
          )}

          <div className='mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4'>
            <button
              type='button'
              onClick={() => setShowAllReports((prev) => !prev)}
              className='flex-1 border border-[#f9f5d2]/20 bg-zinc-900/80 text-[#f9f5d2] py-4 px-6 sm:px-10 text-base sm:text-[1.1rem] rounded-full font-bold hover:bg-zinc-900 hover:border-[#f9f5d2] hover:scale-[1.02] active:scale-[0.99] transition ease-in-out cursor-pointer select-none'
            >
              All Reports
            </button>
            <button disabled={loading} onClick={handleGenerateReport} type='submit' className='flex-1 bg-[#f9f5d2] text-zinc-900 py-4 px-6 sm:px-10 text-base sm:text-[1.1rem] rounded-full font-bold hover:bg-[#f4edd0] hover:scale-[1.02] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100 transition ease-in-out cursor-pointer select-none'>
              {loading ? "Loading...(this may take some time)" : "Generate Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form
