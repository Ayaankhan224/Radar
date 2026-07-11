import React, { useState } from 'react'
import { useResume } from '../hooks/useResume'
import { useParams, useNavigate } from 'react-router-dom'
import '../../interview/pages/Form.css'

const ResumeView = () => {
  const { resume, loading, downloadPdf, deleteResumeById } = useResume()
  const { resumeId } = useParams()
  const navigate = useNavigate()
  const [downloadError, setDownloadError] = useState('')

  const openPrintFallback = () => {
    const iframe = document.createElement('iframe')
    iframe.style.position = 'fixed'
    iframe.style.right = '0'
    iframe.style.bottom = '0'
    iframe.style.width = '0'
    iframe.style.height = '0'
    iframe.style.border = '0'
    iframe.srcdoc = resume.htmlContent
    document.body.appendChild(iframe)

    iframe.onload = () => {
      iframe.contentWindow?.focus()
      iframe.contentWindow?.print()

      window.setTimeout(() => {
        iframe.remove()
      }, 1000)
    }
  }

  const handleDownload = async () => {
    setDownloadError('')

    try {
      await downloadPdf(resumeId)
    } catch (err) {
      setDownloadError('PDF download failed, so opened print view. Choose "Save to PDF" in the print dialog.')
      openPrintFallback()
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Delete this resume? This cannot be undone.')) {
      const success = await deleteResumeById(resumeId)
      if (success) {
        navigate('/resume')
      }
    }
  }

  if (loading) {
    return (
      <div className='flex h-screen w-screen bg-[#f9f5d2] items-center justify-center'>
        <div className='text-zinc-800 text-2xl font-bold'>Loading...</div>
      </div>
    )
  }

  if (!resume) {
    return (
      <div className='flex h-screen w-screen bg-[#f9f5d2] items-center justify-center'>
        <div className='text-zinc-800 text-2xl font-bold'>Resume not found</div>
      </div>
    )
  }

  return (
    <div className='flex h-screen w-screen bg-[#f9f5d2] p-4'>
      <div className='hidden md:block flex-[1.05] rounded-l-4xl overflow-hidden relative'>
        <img className='w-full h-full object-fill' src="/resumebg.jpg" alt="Resume Gradient" />
        <div className='absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent' />
        <div className='absolute bottom-8 left-8 right-8'>
          <p className='text-[#f9f5d2] text-sm uppercase tracking-[0.2em] font-semibold mb-2'>Resume Preview</p>
          <h2 className='text-white text-4xl font-mono font-bold tracking-tight'>{resume.fullName}</h2>
        </div>
      </div>

      <div className='flex-[0.95] bg-zinc-800 rounded-4xl md:rounded-l-none md:rounded-r-4xl flex flex-col px-6 py-8 overflow-hidden'>
        <div className='flex items-center justify-between mb-6'>
          <button
            onClick={() => navigate('/resume')}
            className='border border-[#f9f5d2]/20 bg-zinc-900/80 text-[#f9f5d2] py-2 px-6 rounded-full font-bold hover:bg-zinc-900 hover:border-[#f9f5d2] transition cursor-pointer select-none'
          >
            ← Back
          </button>
          <div className='flex gap-4'>
            <button
              onClick={handleDownload}
              disabled={loading}
              className='bg-[#f9f5d2] text-zinc-900 py-2 px-6 rounded-full font-bold hover:bg-[#f4edd0] transition cursor-pointer select-none'
            >
              {loading ? 'Preparing...' : 'Download PDF'}
            </button>
            <button
              onClick={handleDelete}
              className='border border-red-400/30 text-red-300 py-2 px-6 rounded-full font-bold hover:border-red-400 hover:text-red-200 transition cursor-pointer select-none'
            >
              Delete
            </button>
          </div>
        </div>

        {downloadError && (
          <p className='mb-4 rounded-2xl border border-red-300/30 bg-red-950/40 px-4 py-3 text-sm font-semibold text-red-100'>
            {downloadError}
          </p>
        )}

        <div className='flex-1 overflow-y-auto form-scroll bg-white rounded-3xl p-8'>
          <div dangerouslySetInnerHTML={{ __html: resume.htmlContent }} />
        </div>
      </div>
    </div>
  )
}

export default ResumeView
