import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './Report.css'
import { useInterview } from '../hooks/useInterview'

const Interview = () => {
  const { report, loading } = useInterview()
  const location = useLocation()
  const [selectedTab, setSelectedTab] = useState('technical')
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const tabs = [
    { id: 'technical', label: 'Technical Questions' },
    { id: 'behavioral', label: 'Behavioral Questions' },
    { id: 'roadmap', label: 'Road Map' },
  ]

  if (!report) {
    if (!loading) {
      return (
        <main className='report-page'>
          <section className='report-shell'>
            <div style={{padding: 40}}>
              <p>No report data available.</p>
            </div>
          </section>
        </main>
      )
    }

    // Skeleton UI while loading
    return (
      <main className='report-page'>
        <section className='report-shell'>
          <aside className='report-left'>
            <div className='report-score-panel'>
              <p className='report-eyebrow'>Match Score</p>
              <div className='report-score-circle' style={{background:'#e5e7eb',height:96,width:96,borderRadius:'50%'}} />
              <p className='report-score-label' style={{height:18,width:140,background:'#e5e7eb',borderRadius:6,marginTop:12}} />
            </div>

            <nav className='report-nav' style={{marginTop:20}}>
              {tabs.map((tab) => (
                <div key={tab.id} style={{height:40,background:'#e5e7eb',borderRadius:8,marginBottom:10,width:160}} />
              ))}
            </nav>
          </aside>

          <section className='report-center'>
            <div className='report-heading'>
              <p className='report-eyebrow'>Selected Tab</p>
              <h2 style={{background:'#e5e7eb',height:28,width:240,borderRadius:6}} />
            </div>

            <div className='report-question-list'>
              {Array.from({ length: 5 }).map((_, i) => (
                <article key={i} className='report-card' style={{padding:16}}>
                  <div style={{height:18,width:'40%',background:'#e5e7eb',borderRadius:6,marginBottom:8}} />
                  <div style={{height:14,width:'80%',background:'#f3f4f6',borderRadius:6,marginBottom:6}} />
                  <div style={{height:14,width:'60%',background:'#f3f4f6',borderRadius:6}} />
                </article>
              ))}
            </div>
          </section>

          <aside className='report-right'>
            <p className='report-eyebrow'>Skill Gaps</p>
            <div className='report-skill-list' style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} style={{height:32,width:160,background:'#e5e7eb',borderRadius:20}} />
              ))}
            </div>
          </aside>
        </section>
      </main>
    )
  }

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
