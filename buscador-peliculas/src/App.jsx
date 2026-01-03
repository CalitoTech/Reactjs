import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useState, useCallback } from 'react'
import debounce from 'just-debounce-it'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)

  const updateSearchWithValidation = (value) => {
    // 1. Actualizamos el valor
    updateSearch(value)

    // 2. Validamos inmediatamente
    if (value === '') {
      setError(null)
      return
    }

    if (value.length < 2) {
      setError("La búsqueda debe tener al menos 2 caracteres")
      return
    }

    setError(null)
  }

    return {search, updateSearch: updateSearchWithValidation, error}
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    (search) => {
      const fn = debounce(s => getMovies(s), 300)
      fn(search)
    }, [getMovies]
  )

  const handleSort = () => {
    setSort(!sort)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies(search)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }
  
  return (
    <div className="page">
      <header>
        <h1>Buscador de Películas</h1>
        <form onSubmit={handleSubmit}>
          <input name="query" value={search} onChange={handleChange} type="text" id="search" placeholder="Avengers, Batman, etc..." />
          <input type="checkbox" onChange={handleSort} checked={sort}/> Ordenar por título
          <button type="submit">Buscar</button>
        </form>
        {error && <p className="error" style={{color: 'red'}}>{error}</p>}
      </header>
      <main>
        {loading ? <p className='loading'>Cargando...</p> : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App
