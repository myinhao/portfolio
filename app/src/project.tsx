import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigation } from './sections/Navigation'
import { Projects } from './sections/Projects'
import { Footer } from './sections/Footer'
import './index.css'
import './App.css'

function ProjectPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />
      <main className="pt-14">
        <Projects />
      </main>
      <Footer />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProjectPage />
  </React.StrictMode>,
)
