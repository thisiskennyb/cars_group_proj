import { useState } from 'react'
import './App.css'
import MiniDrawer from './components/MiniDrawer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/Home'
import Login from './components/Login'
import MyGarage from './components/MyGarage'

function App() {
  const [userToken, setUserToken] = useState(null)

  return (
    <>
    <Router>
    <MiniDrawer />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/mygarage' element={<MyGarage />} />
     </Routes>
     </Router>

    </>
  )
}

export default App
