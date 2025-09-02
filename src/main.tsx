import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './views/Login.tsx'
import Play from './views/Play.tsx'
import LeaderBoard from './views/LeaderBoard.tsx'
import Menu from './views/Menu.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/play' element={<Play />} />
        <Route path='/leaderboard' element={<LeaderBoard />} />
        <Route path='/menu' element={<Menu />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
