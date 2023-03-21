import { useEffect, useState } from 'react'
import './App.css'
//import { useRef } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)

  //validar de forma controlada
  useEffect(() => {
    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App() {
  const { movies: mappedMovies } = useMovies()
  const { search, updateSearch, error } = useSearch()
  //const [query, setQuery] = useState('')

  //const inputRef = useRef()

  const handleSubmit = event => {
    event.preventDefault()
    //using useRef:
    //const inputEl = inputRef.current
    //const value = inputEl.value

    //using DOM element from name property:
    //const { query } = Object.fromEntries(
    //  new window.FormData(event.target)
    //)
    console.log({ search })

    // from here we could make form validation
    //if (query === ''){
    //  setError('No se ingresó ninguna película')
    //}
  }

  //Gestionar de forma controlada el formulario con el estado:
  const handleChange = event => {
    //const newQuery = event.target.value
    // if (newQuery.startsWith(' ')) return
    updateSearch(event.target.value)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
            onChange={handleChange}
            value={search}
            name='query'
            placeholder='Avengers, Star Wars, The Matrix...'
          />
          <button type='submit'>Buscar</button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        <Movies movies={mappedMovies} />
      </main>
    </div>
  )
}

export default App
