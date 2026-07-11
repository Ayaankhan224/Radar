import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './src/features/auth/hooks/useAuth'

const Home = () => {
  const navigate = useNavigate()
  const { user, loading, handleLogout } = useAuth()
  const [activeSection, setActiveSection] = useState('home')

  const onLogout = async () => {
    await handleLogout()
    navigate('/')
  }

  return (
    <div className='min-h-screen w-full overflow-x-hidden bg-[#27272a] flex flex-col p-2 sm:p-3'>
      <nav className='w-full min-h-10 flex flex-wrap items-center justify-between gap-3 mb-2 px-1'>
        <div className='text-lg sm:text-xl font-bold text-white tracking-tight'>RADAR</div>
        
        <div className='order-3 w-full justify-center sm:order-none sm:w-auto flex gap-5 sm:gap-6'>
          <button 
            onClick={() => setActiveSection('home')}
            className={`text-sm font-medium transition-colors ${activeSection === 'home' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveSection('about')}
            className={`text-sm font-medium transition-colors ${activeSection === 'about' ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
          >
            About
          </button>
        </div>

        <div className='flex items-center gap-2 sm:gap-3'>
          {user ? (
            <button
              type='button'
              onClick={onLogout}
              disabled={loading}
              className='px-3 py-2 sm:py-1 text-xs font-medium border border-white/20 text-white rounded-full hover:border-white hover:bg-white/10 disabled:opacity-60 transition-colors'
            >
              Logout
            </button>
          ) : (
            <button
              type='button'
              onClick={() => navigate('/login')}
              className='px-3 py-2 sm:py-1 text-xs font-medium border border-white/20 text-white rounded-full hover:border-white hover:bg-white/10 transition-colors'
            >
              Login
            </button>
          )}

          <a 
            href='https://github.com/Ayaankhan224/Radar'
            target='_blank'
            rel='noopener noreferrer'
            className='px-3 py-2 sm:py-1 text-xs font-medium bg-white text-black rounded-full hover:bg-zinc-200 transition-colors whitespace-nowrap'
          >
            Source Code
          </a>
        </div>
      </nav>

      {activeSection === 'home' ? (
        <div key='home' className='w-full flex-1 min-h-[calc(100vh-7.5rem)] sm:min-h-[calc(100vh-4.5rem)] bg-[url(/bg.jpg)] bg-cover bg-center rounded-[1.75rem] sm:rounded-4xl flex flex-col justify-end p-6 sm:p-10 lg:p-14 gap-5 sm:gap-8 animate-fade-in'>
          <h1 className='max-w-5xl text-[clamp(2.45rem,10vw,4.4rem)] font-sans tracking-tight font-semibold leading-[0.98] text-zinc-950'>Know What You're Missing.<br className='hidden sm:block' />Build What <span className='font-serif font-normal text-[clamp(2.7rem,11vw,5rem)] italic'>Matters.</span></h1>
          <p className='max-w-2xl font-sans text-sm sm:text-base text-zinc-800'>Stop guessing what recruiters want. RADAR analyzes your profile against any role and creates an AI-powered action plan to make you interview-ready.</p>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
            <button onClick={() => navigate('/form')} className='px-5 py-3 sm:py-2 text-sm sm:text-[0.8rem] bg-black rounded-4xl w-full sm:w-fit text-white hover:scale-[1.03] cursor-pointer transition ease-in'>See it in action</button>
            <button onClick={() => navigate('/resume')} className='px-5 py-3 sm:py-2 text-sm sm:text-[0.8rem] border-2 border-black rounded-4xl w-full sm:w-fit text-zinc-950 sm:text-white hover:scale-[1.03] cursor-pointer transition ease-in'>Generate Resume</button>
          </div>
        </div>
      ) : (
        <div key='about' className='w-full flex-1 min-h-[calc(100vh-7.5rem)] sm:min-h-[calc(100vh-4.5rem)] bg-[#27272a] rounded-[1.75rem] sm:rounded-4xl flex flex-col items-center justify-center p-6 sm:p-10 lg:p-14 gap-6 sm:gap-8 animate-slide-up'>
          <h1 className='text-[clamp(3rem,12vw,5rem)] font-serif text-white leading-tight text-center'>Ayaan Khan</h1>
          <p className='font-sans text-zinc-400 text-center max-w-2xl leading-relaxed text-sm sm:text-base'>
            A Designer, developer, and art guy by heart. I build digital experiences with an artist's mindset, where design, development, and creativity exist beyond aesthetics and metrics.
          </p>
          <div className='flex gap-3 sm:gap-4'>
            <a 
              href='https://instagram.com/ayaannn.6'
              target='_blank'
              rel='noopener noreferrer'
              className='p-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-all hover:scale-110'
            >
              <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z'/>
                <path d='M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/>
              </svg>
            </a>
            <a 
              href='https://www.linkedin.com/in/ayaan-khan-702ba6410/'
              target='_blank'
              rel='noopener noreferrer'
              className='p-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-all hover:scale-110'
            >
              <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
              </svg>
            </a>
            <a 
              href='https://portfolio-wheat-six-ebo4wwgi5a.vercel.app/'
              target='_blank'
              rel='noopener noreferrer'
              className='p-3 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-all hover:scale-110'
            >
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
