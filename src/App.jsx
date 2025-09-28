import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import MovieDetailPage from './pages/MovieDetailPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/movies/:id' element={<MovieDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
