import { useCatImage } from '../hooks/useCatImage.js'
import { useCatFact } from '../hooks/useCatFact.js'

export function Otro() {
    const { fact } = useCatFact()
    const { imageUrl } = useCatImage({ fact })
    return (
        <>
        {imageUrl && <img src={`${imageUrl}`} alt="Imagen de un gato" />}
        </>
    )
}