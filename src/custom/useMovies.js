import { useEffect, useState } from 'react'

export function useMovies(query, callBack) {
    const Key = '143a7870'
    const [movies, setMovies] = useState([])
    const [isloding, setIsloding] = useState(false)
    const [error, setError] = useState('')
    useEffect(
        function () {
            callBack?.()
            const controller = new AbortController()
            async function fetchMovie() {
                try {
                    setError('')
                    setIsloding(true)
                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${Key}&s=${query}`,
                        { signal: controller.signal }
                    )
                    if (!res.ok) throw new Error('Something went wrong')
                    const data = await res.json()
                    if (data.Response === 'False')
                        throw new Error('Movie Not Found')

                    setMovies(data.Search)
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        setError(err.message)
                    }

                    console.log(err)
                } finally {
                    setIsloding(false)
                }
            }
            if (query.length < 3) {
                setMovies([])
                setError('')
                return
            }

            fetchMovie()
            return function () {
                controller.abort()
            }
        },
        [query]
    )
    return { isloding, movies, error }
}
