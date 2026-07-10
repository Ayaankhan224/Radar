import React, { useState } from 'react'
import { useLocation } from 'react-router'
import './Report.css'

const fallbackReport = {
  score: 25,
  technicalQuestions: [
    {
      question: 'How would you move from a MERN backend to Java and Spring Boot for building scalable APIs?',
      intention: 'Checks learning agility and whether existing REST/API knowledge transfers to a different backend stack.',
      answer: 'Explain a focused learning plan, compare Express routing with Spring controllers, practice with one CRUD API, and call out areas like dependency injection, JPA, validation, and testing.',
    },
    {
      question: 'What role does Docker play in preparing an application for a Kubernetes-based deployment?',
      intention: 'Checks whether the candidate understands the difference between containerization and orchestration.',
      answer: 'Docker packages the app and runtime into an image. Kubernetes then schedules, scales, restarts, and connects those containers across infrastructure.',
    },
  ],
  behavioralQuestions: [
    {
      question: 'Tell me about a time you had to learn a new technology quickly for a project.',
      intention: 'Checks adaptability, ownership, and ability to work through unfamiliar technical areas.',
      answer: 'Use STAR: describe the project, the learning plan, the obstacle, and the result. Tie the answer to how you would approach this role.',
    },
    {
      question: 'Describe a time you handled unclear or changing requirements.',
      intention: 'Checks communication, prioritization, and project judgment.',
      answer: 'Explain how you clarified the goal, broke the work into smaller decisions, communicated tradeoffs, and kept progress visible.',
    },
  ],
  skillGap: [
    { skill: 'Java & Spring Boot', severity: 'high' },
    { skill: 'AWS Services', severity: 'high' },
    { skill: 'Microservices', severity: 'high' },
    { skill: 'Kubernetes', severity: 'medium' },
    { skill: 'System Design', severity: 'medium' },
  ],
  preparationPlan: [
    {
      day: 1,
      focus: 'Java Fundamentals',
      tasks: ['Review Java syntax, OOP, collections, and exception handling.', 'Build small command-line exercises to practice core concepts.'],
    },
    {
      day: 2,
      focus: 'Spring Boot REST APIs',
      tasks: ['Create a Spring Boot project with controller, service, and repository layers.', 'Implement CRUD endpoints and test them with an API client.'],
    },
    {
      day: 3,
      focus: 'Databases',
      tasks: ['Connect Spring Data JPA with PostgreSQL.', 'Practice schema design, relationships, and repository methods.'],
    },
  ],
}

const Interview = () => {
  const location = useLocation()
  const report = location.state?.interviewReport || location.state?.report || fallbackReport
  const [selectedTab, setSelectedTab] = useState('technical')
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const tabs = [
    { id: 'technical', label: 'Technical Questions' },
    { id: 'behavioral', label: 'Behavioral Questions' },
    { id: 'roadmap', label: 'Road Map' },
  ]

  const title = tabs.find((tab) => tab.id === selectedTab)?.label || 'Technical Questions'
  const score = report.score ?? 0

  const questions = selectedTab === 'technical'
    ? report.technicalQuestions || []
    : report.behavioralQuestions || []

  const scoreLabel = score >= 70
    ? 'Strong match for this role'
    : score >= 40
      ? 'Partial match for this role'
      : 'Needs focused preparation'

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId)
    setExpandedQuestion(null)
  }

  return (
    <main className='report-page'>
      <section className='report-shell'>
        <aside className='report-left'>
          <div className='report-score-panel'>
            <p className='report-eyebrow'>Match Score</p>
            <div className='report-score-circle'>
              <span className='report-score-text'>{score}</span>
              <span className='report-score-percent'>%</span>
            </div>
            <p className='report-score-label'>{scoreLabel}</p>
          </div>

          <nav className='report-nav'>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type='button'
                onClick={() => { handleTabClick(tab.id) }}
                className={`report-tab ${selectedTab === tab.id ? 'report-tab-active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <section className='report-center'>
          <div className='report-heading'>
            <p className='report-eyebrow'>Selected Tab</p>
            <h2>{title}</h2>
          </div>

          {selectedTab === 'roadmap' ? (
            <div className='report-roadmap'>
              <div className='report-roadmap-line' />
              {(report.preparationPlan || []).map((day) => (
                <article key={day.day} className='report-roadmap-item'>
                  <span className='report-roadmap-dot' />
                  <div className='report-roadmap-header'>
                    <span className='report-day-badge'>Day {day.day}</span>
                    <h3>{day.focus}</h3>
                  </div>
                  <ul className='report-roadmap-tasks'>
                    {(day.tasks || []).map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          ) : (
            <div className='report-question-list'>
              {questions.map((item, index) => {
                const isExpanded = expandedQuestion === index

                return (
                  <article key={`${item.question}-${index}`} className='report-card'>
                    <button
                      type='button'
                      onClick={() => { setExpandedQuestion(isExpanded ? null : index) }}
                      className='report-question-button'
                    >
                      <div className='report-question-copy'>
                        <p>Question {index + 1}</p>
                        <h3>{item.question}</h3>
                      </div>
                      <span className={`report-expand-mark ${isExpanded ? 'report-expand-mark-open' : ''}`} aria-hidden='true'>
                        <span />
                        <span />
                      </span>
                    </button>

                    <div className={`report-question-details ${isExpanded ? 'report-question-details-open' : ''}`}>
                      <div>
                        <p className='report-detail-label'>Intention</p>
                        <p>{item.intention}</p>
                      </div>
                      <div>
                        <p className='report-detail-label'>Answer</p>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {((selectedTab === 'roadmap' && !report.preparationPlan?.length) || (selectedTab !== 'roadmap' && !questions.length)) && (
            <div className='report-card report-empty'>
              <p>No report content available for this tab yet.</p>
            </div>
          )}
        </section>

        <aside className='report-right'>
          <p className='report-eyebrow'>Skill Gaps</p>
          <div className='report-skill-list'>
            {(report.skillGap || []).map((gap) => (
              <div key={gap.skill} className='report-skill-pill'>
                <p>{gap.skill}</p>
                <span>{gap.severity} severity</span>
              </div>
            ))}
          </div>

          {!report.skillGap?.length && (
            <div className='report-card report-empty'>
              <p>No skill gaps available yet.</p>
            </div>
          )}
        </aside>
      </section>
    </main>
  )
}

export default Interview
