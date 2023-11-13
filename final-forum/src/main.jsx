import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import View from './pages/View'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/home/:league" element={<Home />}/>
        <Route path="/create" element={<Create />}/>
        <Route path="/view/:id" element={<View />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
