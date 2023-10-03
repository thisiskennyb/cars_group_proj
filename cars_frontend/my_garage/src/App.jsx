import { useState } from 'react'
import './App.css'
import MiniDrawer from './components/MiniDrawer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/Home'

function App() {
 

  return (
    <>
    <Router>
    <MiniDrawer />
     <Routes>
      <Route path="/" element={<Home />} />
     </Routes>
     </Router>

    </>
  )
}

export default App
