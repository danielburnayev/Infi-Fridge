import App from './pages/App.jsx'
import ViewPage from './pages/ViewPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/edit/:postItTitle" element={<ViewPage />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
