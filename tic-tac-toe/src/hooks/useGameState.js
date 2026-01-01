
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { TURNS } from "../constants.js"
import { checkWinnerFrom, checkEndGame } from "../logic/board.js"
import { resetGameToStorage, saveGameToStorage } from '../logic/storage/index.js'

export function useGameState() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    // Limpiar localStorage
    resetGameToStorage()
  }

  const updateBoard = (index) => {
    // No actualizamos si ya hay algo o si hay un ganador
    if (board[index] || winner) return
    // Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // Guardar en localStorage
    saveGameToStorage(newBoard, newTurn)
    // Revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return { board, turn, winner, updateBoard, resetGame }
}