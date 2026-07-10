import {createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/login'
import Register from './features/auth/pages/register'
import Protected from './features/auth/components/Protected'
import Form from './features/interview/pages/Form'
import Report from './features/interview/pages/Report'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected><main className='h-screen w-screen bg-zinc-500'><h1 className='text-8xl font-mono bold uppercase'>Home page</h1></main></Protected>
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },{
    path: '/form',
    element: <Form />
  },
  {
    path: '/report',
    element: <Report />
  }
])