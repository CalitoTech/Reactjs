import { Square } from "./Square.jsx"

export function Board ({ board, updateBoard }) {

    const squares = board.map((square, index) => {
        return (
            <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
            >
                {board[index]}
            </Square>
        )
    })
    return (
        <section className="game">{squares}</section>
    )
}