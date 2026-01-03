import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useState, useEffect, useRef} from 'react'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

   useEffect(() => {
      if (isFirstInput.current) {
        isFirstInput.current = search === ''
        return
      }

      if (search === '') {
        setError("No se puede buscar una película vacía")
        return
      }

      if (search.length < 2) {
        setError("La búsqueda debe tener al menos 2 caracteres")
        return
      }

      setError(null)
    }, [search])

    return {search, updateSearch, error}
}

function App() {
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({ search })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies(search)
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }
    return (
    <div className="page">
      <header>
        <h1>Buscador de Películas</h1>
        <form onSubmit={handleSubmit}>
          <input name="query" value={search} onChange={handleChange} type="text" id="search" placeholder="Avengers, Batman, etc..." />
          <button type="submit">Buscar</button>
        </form>
        {error && <p className="error" style={{color: 'red'}}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
