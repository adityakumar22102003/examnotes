
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Home from './pages/Home.jsx'
import Auth from "./pages/Auth.jsx"
import { useEffect } from 'react'
export const serverUrl = "http://localhost:5000"
import { getCurrentUser } from "./services/api.js"
import { useDispatch, useSelector } from "react-redux"
import Notes from './pages/Notes.jsx'
import History from './pages/History.jsx'
import Pricing from './pages/Pricing.jsx'
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser(dispatch)
  },[dispatch])
  const { userData } = useSelector((state) => state.user)
  // console.log("userData -> ",userData)
  return (
    <>
      <Routes>
        <Route path="/" element={userData ? <Home /> : <Navigate to="/auth" replace />} />
        
        <Route path="/auth" element={userData ? <Navigate to="/" replace /> : <Auth />} />

        <Route path="/notes" element={userData ? <Notes /> : <Navigate to="/auth" replace />} />
        <Route path="/history" element={userData ? <History /> : <Navigate to="/auth" replace />} />
        <Route path="/pricing" element={userData ? <Pricing /> : <Navigate to="/auth" replace />} />
        
      </Routes>
    </>
  )
}

export default App
