// Jai Shree Ram

import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../../store/appStore'

function Dock() {
  const navigate = useNavigate()
  const setIsAppOpened = useAppStore((state) => state.setIsAppOpened)


  const openApp = (appName) => {
    setIsAppOpened(true)
    navigate(`/app/${appName}/`)
  }

  return (
    <>
      <div className="dock-container fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <div className="dock pointer-events-auto flex items-end gap-4 px-6 py-3 bg-[var(--whiteGlass)] rounded-3xl shadow-lg backdrop-blur-lg">
          
          {/* Terminal app icon */}
          <div 
            onClick={() => openApp('terminal')}
            className="dock-icon group flex flex-col items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 cursor-pointer"
          >
            <div className="icon-indicator h-1.5 w-6 bg-white/0 rounded-full mb-1.5 group-hover:bg-white/70 transition-all"></div>
            <div className="icon-bg w-16 h-16 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-md">
              <svg className="w-9 h-9 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
            </div>
          </div>

          {/* File Explorer icon */}
          <div 
            onClick={() => openApp('explorer')}
            className="dock-icon group flex flex-col items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 cursor-pointer"
          >
            <div className="icon-indicator h-1.5 w-6 bg-white/0 rounded-full mb-1.5 group-hover:bg-white/70 transition-all"></div>
            <div className="icon-bg w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-md">
              <svg className="w-9 h-9 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          </div>

          {/* Spotify icon */}
          <div 
            onClick={() => openApp('spotify')}
            className="dock-icon group flex flex-col items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 cursor-pointer"
          >
            <div className="icon-indicator h-1.5 w-6 bg-white/0 rounded-full mb-1.5 group-hover:bg-white/70 transition-all"></div>
            <div className="icon-bg w-16 h-16 flex items-center justify-center bg-gradient-to-br from-green-500 to-green-700 rounded-2xl shadow-md">
              <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
          </div>

          {/* Google Search icon */}
          <div 
            onClick={() => openApp('search')}
            className="dock-icon group flex flex-col items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 cursor-pointer"
          >
            <div className="icon-indicator h-1.5 w-6 bg-white/0 rounded-full mb-1.5 group-hover:bg-white/70 transition-all"></div>
            <div className="icon-bg w-16 h-16 flex items-center justify-center bg-gradient-to-br from-slate-50 to-gray-200 rounded-2xl shadow-md">
              <svg className="w-9 h-9" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
                <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"/>
                <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"/>
                <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/>
              </svg>
            </div>
          </div>

          {/* Planner app icon */}
          <div 
            onClick={() => openApp('notion')}
            className="dock-icon group flex flex-col items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 cursor-pointer"
          >
            <div className="icon-indicator h-1.5 w-6 bg-white/0 rounded-full mb-1.5 group-hover:bg-white/70 transition-all"></div>
            <div className="icon-bg w-16 h-16 flex items-center justify-center bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-md">
              <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
              </svg>
            </div>
          </div>

          {/* More Apps icon */}
          <div 
            onClick={() => openApp('more-apps')}
            className="dock-icon group flex flex-col items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 cursor-pointer"
          >
            <div className="icon-indicator h-1.5 w-6 bg-white/0 rounded-full mb-1.5 group-hover:bg-white/70 transition-all"></div>
            <div className="icon-bg w-16 h-16 flex items-center justify-center bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl shadow-md">
              <div className="grid grid-cols-3 grid-rows-3 gap-1.5 w-11 h-11">
                <div className="bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                </div>
                <div className="bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* native-env icon */}
          <div 
            onClick={() => openApp('native-env')}
            className="dock-icon group flex flex-col items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 active:scale-95 cursor-pointer"
          >
            <div className="icon-indicator h-1.5 w-6 bg-white/0 rounded-full mb-1.5 group-hover:bg-white/70 transition-all"></div>
            <div className="icon-bg w-16 h-16 flex items-center justify-center bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl shadow-md">
              <svg className="w-9 h-9 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 11"/>
              </svg>
            </div>
          </div>
          
        </div>
      </div>

      
    </>
  )
}

export default Dock