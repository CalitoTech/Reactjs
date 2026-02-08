import './App.css'
import { useMemo, useState } from "react"
import { UsersList } from './components/UsersList'
import { SortBy, type User } from './types.d'
import { useUsers } from './hook/useUsers'
import { Results } from './components/Results'
import { useQueryClient } from '@tanstack/react-query'
import { type InfiniteData } from '@tanstack/react-query'

interface UsersPage {
  nextCursor: number | undefined
  users: User[]
}

function App() {
  const useUser = useUsers()
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUser
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  // const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const queryClient = useQueryClient()

  const handleDelete = (email: string) => {
  // InfiniteData es el tipo genérico de TanStack Query para datos paginados
    queryClient.setQueryData<InfiniteData<UsersPage>>(['users'], (oldData) => {
      if (oldData == null) return undefined

      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          users: page.users.filter((user) => user.email !== email)
        }))
      }
    })
  }

  const handleReset = async () => {
    await refetch()
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

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
        <Results />
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
        {isLoading && <p>Cargando usuarios...</p>}
        {isError && <p>Ha habido un error: {isError}</p>}
        {users.length === 0 && !isLoading && !isError && <p>No hay usuarios disponibles.</p>}
        { users.length > 0 &&
          <UsersList changeSorting={handleChangeSort} showColors={showColors} users={sortedUsers} deleteUser={handleDelete} />
        }
        {!isLoading && !isError && users.length > 0 && hasNextPage &&
        <button onClick={() => {fetchNextPage()}}>
          Cargar más usuarios
        </button>
        }
        {!isLoading && !isError && users.length > 0 && !hasNextPage &&
          <p>No hay más usuarios para cargar.</p>
        }
        </div>
    </>
  )
}

export default App
