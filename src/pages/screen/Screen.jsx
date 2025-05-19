// Jai Shree Ram

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Settings from './apps/settings/Settings'
import Terminal from './apps/terminal/Terminal'
import FileExplorer from './apps/fileexplorer/FileExplorer'
import Spotify from './apps/spotify/Spotify'
import useAppStore from '../../store/appStore'
import Search from './apps/search/Search'
import Notion from './apps/notion/Notion'
import NativeEnv from './apps/nativeEnv/NativeEnv'
import NotFound from '../notFound/NotFound'

function Screen() {
  const isAppOpened = useAppStore((state) => state.isAppOpened)

  return (

    <>
    
      <Routes>
          <Route path="notion/" element={<Notion />} />
          <Route path="settings/" element={<Settings />} />
          <Route path="terminal/" element={<Terminal />} />
          <Route path="explorer/" element={<FileExplorer />} />
          <Route path="spotify/" element={<Spotify />} />
          <Route path='search/' element={<Search />} />
          <Route path='native-env/' element={<NativeEnv />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
    
    </>
    
  )
}

export default Screen