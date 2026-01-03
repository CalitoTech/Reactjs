import { WinnerModal } from './components/WinnerModal.jsx'
import { Board } from './components/Board.jsx'
import { Turn } from './components/Turn.jsx'
import { useGameState } from './hooks/useGameState.js'

function App() {

  const { board, turn, winner, updateBoard, resetGame } = useGameState()

  return (
    <main className="board">
      <h1>Tic Tac Toe App</h1>
      <button onClick={resetGame}>Reiniciar Juego</button>
      <Board board={board} updateBoard={updateBoard} />

      <Turn turn={turn} />

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
