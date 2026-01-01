import { Square } from './Square.jsx'

export function WinnerModal ({ winner, resetGame}) {
    if (winner === null) return null

    const winnerText = winner === false ? 'Empate' : 'Ha ganado: ' + winner
    const winnerHeader = winner === false ? '😥' : winner

    return (
    <section className="winner">
        <div className='text'>
            <h2>{winnerText}</h2>

            <header className='win'>
            <Square>{winnerHeader}</Square>
            </header>

            <footer>
            <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
        </div>
    </section>
    )
 }    