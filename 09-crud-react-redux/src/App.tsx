import './App.css'
import { CreateNewUser } from './components/CreateNewUser'
import { ListOfUsers } from './components/ListOfUsers'
import { Button } from './components/ui/button'
import { Toaster } from 'sonner';

function App() {
  return (
    // Contenedor principal con padding y centrado
    <main className="p-8 max-w-4xl mx-auto">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Usuarios</h2>
          <p className="text-muted-foreground">Administra los usuarios de tu plataforma.</p>
        </div>
        <Button>
          Nuevo Usuario
        </Button>
      </div>

      <ListOfUsers />

      <CreateNewUser />

      <Toaster richColors />
    </main>
  )
}

export default App