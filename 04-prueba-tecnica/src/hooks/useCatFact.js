import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts.js'

export const useCatFact = () => {
    
    const [fact, setFact] = useState('Lorem ipsum')
    
    const refreshFact = () => {
        getRandomFact().then(newFact => setFact(newFact))
    }

    useEffect (() => (refreshFact()), [])

    return { fact, refreshFact }
}