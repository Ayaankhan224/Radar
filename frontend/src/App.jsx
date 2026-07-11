import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes'
import { AuthProvider } from './features/auth/auth.context'
import { InterviewProvider } from './features/interview/interview.context'
import { ResumeProvider } from './features/resume/resume.context'

const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <ResumeProvider>
          <RouterProvider router={router} />
        </ResumeProvider>
      </InterviewProvider>
    </AuthProvider>
  )
}

export default App