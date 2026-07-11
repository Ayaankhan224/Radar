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
    } catch {
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
      <div className='flex min-h-screen w-full bg-[#f9f5d2] items-center justify-center p-4 text-center'>
        <div className='text-zinc-800 text-2xl font-bold'>Loading...</div>
      </div>
    )
  }

  if (!resume) {
    return (
      <div className='flex min-h-screen w-full bg-[#f9f5d2] items-center justify-center p-4 text-center'>
        <div className='text-zinc-800 text-2xl font-bold'>Resume not found</div>
      </div>
    )
  }

  const previewStyles = `
    <style>
      @media screen {
        html,
        body {
          max-width: 100%;
          overflow-x: hidden;
        }

        body {
          margin-left: auto !important;
          margin-right: auto !important;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
          max-width: 100%;
        }

        table {
          width: 100%;
          table-layout: fixed;
        }
      }

      @media screen and (max-width: 840px) {
        body {
          width: 100% !important;
          min-width: 0 !important;
        }
      }
    </style>
  `

  const previewHtml = resume.htmlContent.includes('</head>')
    ? resume.htmlContent.replace('</head>', `${previewStyles}</head>`)
    : `${previewStyles}${resume.htmlContent}`

  return (
    <div className='flex min-h-screen 2xl:h-screen w-full bg-[#f9f5d2] p-2 sm:p-4'>
      <div className='hidden 2xl:block flex-[0.8] rounded-l-4xl overflow-hidden relative'>
        <img className='w-full h-full object-fill' src="/resumebg.jpg" alt="Resume Gradient" />
        <div className='absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent' />
        <div className='absolute bottom-8 left-8 right-8'>
          <p className='text-[#f9f5d2] text-sm uppercase tracking-[0.2em] font-semibold mb-2'>Resume Preview</p>
          <h2 className='text-white text-4xl font-mono font-bold tracking-tight'>{resume.fullName}</h2>
        </div>
      </div>

      <div className='flex-1 2xl:flex-[1.2] bg-zinc-800 rounded-[1.75rem] sm:rounded-4xl 2xl:rounded-l-none 2xl:rounded-r-4xl flex flex-col px-4 sm:px-6 py-6 sm:py-8 overflow-hidden'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 shrink-0'>
          <button
            onClick={() => navigate('/resume')}
            className='w-full sm:w-auto border border-[#f9f5d2]/20 bg-zinc-900/80 text-[#f9f5d2] py-2 px-5 sm:px-6 rounded-full font-bold hover:bg-zinc-900 hover:border-[#f9f5d2] transition cursor-pointer select-none'
          >
            ← Back
          </button>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
            <button
              onClick={handleDownload}
              disabled={loading}
              className='bg-[#f9f5d2] text-zinc-900 py-2 px-5 sm:px-6 rounded-full font-bold hover:bg-[#f4edd0] transition cursor-pointer select-none'
            >
              {loading ? 'Preparing...' : 'Download PDF'}
            </button>
            <button
              onClick={handleDelete}
              className='border border-red-400/30 text-red-300 py-2 px-5 sm:px-6 rounded-full font-bold hover:border-red-400 hover:text-red-200 transition cursor-pointer select-none'
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

        <div className='flex-1 min-h-[70vh] 2xl:min-h-0 overflow-hidden bg-white rounded-3xl'>
          <iframe
            title={`${resume.fullName || 'Resume'} preview`}
            srcDoc={previewHtml}
            className='h-full min-h-[70vh] 2xl:min-h-0 w-full border-0 bg-white'
          />
        </div>
      </div>
    </div>
  )
}

export default ResumeView
