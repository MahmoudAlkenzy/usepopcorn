import { useEffect, useRef, useState } from 'react'
import { useKey } from '../custom/useKey'
import Loader from './Loader'
import StarRating from '../StarOfRating'

export default function MovieDetails({
    selectedId,
    onClose,
    onAddWatched,
    watched,
    Key,
}) {
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [rating, setRating] = useState('')
    const isWatched = watched
        .map((watched) => watched.imdbID)
        .includes(selectedId)

    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating

    const countRef = useRef(0)
    useEffect(
        function () {
            if (rating) countRef.current += 1
        },
        [rating]
    )
    // const [avrRating, setAvrRating] = useState(0)

    function handleAdd() {
        const newWatchedMocie = {
            imdbRating: Number(movie.imdbRating),
            title: movie.Title,
            runtime: Number(movie.Runtime.split(' ').at(0)),
            year: movie.Year,
            Poster: movie.Poster,
            imdbID: selectedId,
            userRating: rating,
            counrRatingDecisions: countRef.current,
        }
        onAddWatched(newWatchedMocie)
        onClose()

        // setAvrRating(Number(movie.imdbRating))
        // setAvrRating((avrRating) => (avrRating + rating) / 2)
    }

    useKey('escape', onClose)
    useEffect(
        function () {
            async function getMovieDetails() {
                setIsLoading(true)
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${Key}&i=${selectedId}`
                )
                const data = await res.json()
                setMovie(data)

                setIsLoading(false)
            }
            getMovieDetails()
        },
        [selectedId]
    )
    useEffect(() => {
        if (!movie.Title) return
        document.title = `Movie | ${movie.Title}`
        return function () {
            document.title = 'usePopcorn'
        }
    }, [movie.Title])
    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button className="btn-back" onClick={onClose}>
                            &larr;
                        </button>

                        <img
                            src={movie.Poster}
                            alt={`img of ${movie.Title} movie`}
                        />
                        <div className="details-overview">
                            <h4> {movie.Title}</h4>
                            <p>
                                {movie.Released} &bull; {movie.Runtime}
                            </p>
                            <p>{movie.Genre}</p>
                            <p>
                                <span>⭐</span> {movie.imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>
                    {/* <p>{avrRating}</p> */}
                    <section>
                        <div className="rating">
                            {isWatched ? (
                                <p>
                                    'Your Rated This Movie' {watchedUserRating}
                                    <span>⭐</span>
                                </p>
                            ) : (
                                <>
                                    <StarRating
                                        size={20}
                                        maxRating={10}
                                        onSetRate={setRating}
                                    />
                                    {rating > 0 && (
                                        <button
                                            className="btn-add"
                                            onClick={handleAdd}
                                        >
                                            + Add to List
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                        <p>
                            <em>{movie.Plot}</em>
                        </p>
                        <p>Starring: {movie.Actors}</p>
                        <p>Direct by: {movie.Director}</p>
                    </section>{' '}
                </>
            )}
        </div>
    )
}
