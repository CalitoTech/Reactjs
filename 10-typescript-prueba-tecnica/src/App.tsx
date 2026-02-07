import './App.css'
import { useEffect, useMemo, useRef, useState } from "react"
import { UsersList } from './components/UsersList'
import { SortBy, type User } from './types.d'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
      fetch('https://randomuser.me/api/?results=100')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results)
        originalUsers.current = data.results
      })
  }, [])

  const filteredUsers = useMemo(() => {
  return filterCountry
    ? users.filter((user) => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
    : users
  }, [filterCountry, users])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers
    
    const sorted = [...filteredUsers].sort((a, b) => {
      if (sorting === SortBy.NAME) {
        return a.name.first.localeCompare(b.name.first)
      } else if (sorting === SortBy.LAST) {
        return a.name.last.localeCompare(b.name.last)
      } else if (sorting === SortBy.COUNTRY) {
        return a.location.country.localeCompare(b.location.country)
      }
      return 0
    })
    return sorted
  }, [sorting, filteredUsers])

  return (
    <>
      <div>
        <h1>Prueba tecnica</h1>
        <header>
          <button onClick={toggleColors}>
            {showColors ? 'Ocultar colores' : 'Mostrar colores'}
          </button>
          <button onClick={toggleSortByCountry}>
            {sorting === SortBy.COUNTRY ? 'Desordenar por país' : 'Ordenar por país'}
          </button>
          <button onClick={handleReset}>
            Resetear usuarios
          </button>
          <input 
            placeholder='Filtrar por país'
            onChange={(e) => setFilterCountry(e.target.value)}
          />
        </header>
        <UsersList changeSorting={handleChangeSort} showColors={showColors} users={sortedUsers} deleteUser={handleDelete} />
      </div>
    </>
  )
}

export default App
