import { createBrowserRouter } from 'react-router-dom'
import Login from './features/auth/pages/login'
import Register from './features/auth/pages/register'
import Protected from './features/auth/components/Protected'
import Interview from './features/interview/pages/Interview'
import Form from './features/interview/pages/Form'
import Home from '../Home'
import Resume from './features/resume/pages/Resume'
import ResumeView from './features/resume/pages/ResumeView'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: '/form',
    element: <Protected><Form /></Protected>
  },
  {
    path: '/interview',
    element: <Protected><Interview /></Protected>
  },
  {
    path: '/interview/:interviewId',
    element: <Protected><Interview /></Protected>
  },
  {
    path: '/resume',
    element: <Protected><Resume /></Protected>
  },
  {
    path: '/resume/:resumeId',
    element: <Protected><ResumeView /></Protected>
  }
])
