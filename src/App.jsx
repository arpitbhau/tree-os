// Jai Shree Ram

import React, { useEffect } from 'react'
import "./index.css"
import Toolbar from './pages/toolbar/Toolbar'
import Bg from './pages/bg/Bg'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Screen from './pages/screen/Screen'
import Dock from './pages/dock/Dock'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    
    // some keyboard shortcuts
    const handleKeyDown = (e) => {
      // Check for Host+D (Meta+D on Mac, Windows+D on Windows)
      if ((e.metaKey || e.altKey) && e.key.toLowerCase() === 'd') {

        e.preventDefault() // Prevent default browser behavior
        navigate('/')

      } else if ((e.ctrlKey) && e.key.toLowerCase() === 'i') {

        e.preventDefault() // Prevent default browser behavior
        navigate('/app/search')
        
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  return (

    
    <div className="main select-none  w-full h-screen overflow-hidden relative">
      <Bg />
      <Toolbar />
      
      <div className="screen">
        <Routes>
          <Route path="/app/*" element={<Screen />} />
        </Routes>
      </div>

      <Dock />
    </div>
  )
}

export default App