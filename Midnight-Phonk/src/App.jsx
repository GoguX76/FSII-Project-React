import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  //Maneja las páginas que se mostraran
  const [paginaActual, setPaginaActual] = useState('home')
  console.log('Página Actual:', paginaActual)

  return (
    <div className="app">
      <header>
        <h1>Midnight Phonk</h1>
        <nav>
          <ul>
            <li>
              {/*Cada boton provocará que la página actual sea la que corresponda
              según lo que diga*/}
              <button onClick={() => setPaginaActual('home')}>
                Inicio
              </button>
            </li>
            <li>
              <button onClick={() => setPaginaActual('about')}>
                Sobre Nosotros
              </button>
            </li>
            <li>
              <button onClick={() => setPaginaActual('contact')}>
                Contacto
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/*Aquí hará la comprobación y cambio de página si se cumple*/}
        {paginaActual === 'home' && <Home />}
        {paginaActual === 'about' && <About />}
        {paginaActual === 'contact' && <Contact />}
      </main>

      <footer>
        <p>&copy; Midnight Phonk 2025</p>
      </footer>
    </div>
  )
}

export default App
