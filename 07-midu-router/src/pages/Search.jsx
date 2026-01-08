import { useEffect } from 'react'

export default function SearchPage({ routeParams }) {
    useEffect(() => {
        document.title = `Search: ${routeParams.query}`
    }, [routeParams])

    return <h1>Search Page: {routeParams.query}</h1>
}