import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CalendarioPage from './pages/CalendarioPage'
import FormatoPage from './pages/FormatoPage'
import ReglamentoPage from './pages/ReglamentoPage'
import PremiosPage from './pages/PremiosPage'
import PrediccionPage from './pages/PrediccionPage'

/**
 * App.jsx — Componente raíz.
 * Conecta el router con las páginas y envuelve todo
 * con el Navbar y Footer compartidos.
 */
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/calendario"  element={<CalendarioPage />} />
        <Route path="/formato"     element={<FormatoPage />} />
        <Route path="/reglamento"  element={<ReglamentoPage />} />
        <Route path="/premios"     element={<PremiosPage />} />
        <Route path="/prediccion"  element={<PrediccionPage />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
