const API_URL = 'https://catfact.ninja/fact'

export function getRandomFact() {
    return fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const { fact } = data
            return fact
        })
}