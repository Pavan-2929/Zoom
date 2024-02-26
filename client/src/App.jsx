import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lobby from './pages/Lobby'
import Room from './pages/Room'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Lobby/>}/>
        <Route path='/room/:roomId' element={<Room/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App