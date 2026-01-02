import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'https://catfact.ninja/fact'
// const IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?json=true`
export function App() {
    const [fact, setFact] = useState('Lorem ipsum')
    const [imageUrl, setImageUrl] = useState('')

    useEffect (() => {
        fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const { fact } = data
            setFact(fact)
        })
    }, [])

    useEffect(() => {
        if (!fact) return
        const firstWord = fact.split(' ')[0]
            fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
            .then(res => res.json())
            .then(response => {
                const { url } = response
                setImageUrl(url)
            })
    }, [fact])
    

    return (
        <main>
            <h1>App de gatitos</h1>
            <p>{fact}</p>
            {imageUrl && <img src={`${imageUrl}`} alt="Imagen de un gato" />}
        </main>
    )
}