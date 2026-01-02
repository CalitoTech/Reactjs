import { useState, useEffect } from 'react'

export function useCatImage({ fact }) {
    const [imageUrl, setImageUrl] = useState('')

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
    return { imageUrl }
}