import './App.css'
import { useCatImage } from './hooks/useCatImage.js'
import { useCatFact } from './hooks/useCatFact.js'
import { Otro } from './Components/Otro.jsx'

export function App() {
    const { fact, refreshFact } = useCatFact()
    const { imageUrl } = useCatImage({ fact })
    
    const handleClick = () => {
        refreshFact()
    }

    return (
        <main>
            <h1>App de gatitos</h1>
            <p>{fact}</p>
            {imageUrl && <img src={`${imageUrl}`} alt="Imagen de un gato" />}
            {/* <Otro /> */}
            <button onClick={handleClick}>Nuevo dato</button>
        </main>
    )
}