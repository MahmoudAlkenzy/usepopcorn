import { useEffect, useState } from 'react'
import StarRating from './StarOfRating'
import Logo from './components/Logo'

const tempMovieData = [
    {
        imdbID: 'tt1375666',
        Title: 'Inception',
        Year: '2010',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    },
    {
        imdbID: 'tt0133093',
        Title: 'The Matrix',
        Year: '1999',
        Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    },
    {
        imdbID: 'tt6751668',
        Title: 'Parasite',
        Year: '2019',
        Poster: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
    },
]

const tempWatchedData = [
    {
        imdbID: 'tt1375666',
        Title: 'Inception',
        Year: '2010',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: 'tt0088763',
        Title: 'Back to the Future',
        Year: '1985',
        Poster: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
]
const Key = '143a7870'

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)

export default function App() {
    const [movies, setMovies] = useState([])
    const [watched, setWatched] = useState([])
    const [isloding, setIsloding] = useState(false)
    const [error, setError] = useState('')
    const [query, setQuery] = useState('')
    const [selectedId, setSelectedId] = useState(null)
    const tempQuery = 'interstellar'

    function handelSelect(id) {
        setSelectedId((selectedid) => (id === selectedid ? null : id))
    }
    function handleClose() {
        setSelectedId(null)
    }
    function handleAddWatched(watche) {
        setWatched((watched) => [...watched, watche])
    }
    function handleDelete(id) {
        setWatched((movie) => movie.filter((m) => m.imdbID !== id))
    }

    useEffect(
        function () {
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
            handleClose()
            fetchMovie()
            return function () {
                controller.abort()
            }
        },
        [query]
    )

    return (
        <>
            <NavBar>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <NumOfResult movies={movies} />
            </NavBar>
            <Main>
                <Box>
                    {/* {isloding ? <Loader /> : <MovieList movies={movies} />} */}
                    {isloding && <Loader />}
                    {error && <ErrorMessage message={error} />}
                    {!error && !isloding && (
                        <MovieList
                            movies={movies}
                            onSelectMovie={handelSelect}
                        />
                    )}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onClose={handleClose}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />

                            <WatchedList
                                watched={watched}
                                onDelete={handleDelete}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    )
}

function Loader() {
    return <p className="loader">Loading...</p>
}
function ErrorMessage({ message }) {
    return (
        <p className="error">
            <span>⛔</span>
            {message}
        </p>
    )
}
function NavBar({ children }) {
    return <nav className="nav-bar">{children}</nav>
}

function Search({ query, setQuery }) {
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}

function NumOfResult({ movies }) {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    )
}

function Main({ children }) {
    return <main className="main">{children}</main>
}

function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? '–' : '+'}
            </button>
            {isOpen && children}
        </div>
    )
}

function MovieList({ movies, onSelectMovie }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie
                    movie={movie}
                    key={movie.imdbID}
                    onSelectMovie={onSelectMovie}
                />
            ))}
        </ul>
    )
}

function Movie({ movie, onSelectMovie }) {
    return (
        <li onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    )
}
// function WatchedBox() {
//     const [isOpen2, setIsOpen2] = useState(true)
//     const [watched, setWatched] = useState(tempWatchedData)

//     return (
//         <div className="box">
//             <button
//                 className="btn-toggle"
//                 onClick={() => setIsOpen2((open) => !open)}
//             >
//                 {isOpen2 ? '–' : '+'}
//             </button>
//             {isOpen2 && (
//                 <>
//                     <WatchedSummary watched={watched} />

//                     <WatchedList watched={watched} />
//                 </>
//             )}
//         </div>
//     )
// }

function WatchedSummary({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating))
    const avgUserRating = average(watched.map((movie) => movie.userRating))
    const avgRuntime = average(watched.map((movie) => movie.runtime))
    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    )
}
function WatchedList({ watched, onDelete }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie
                    onDelete={onDelete}
                    movie={movie}
                    key={movie.imdbID}
                />
            ))}
        </ul>
    )
}

function MovieDetails({ selectedId, onClose, onAddWatched, watched }) {
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [rating, setRating] = useState('')
    const isWatched = watched
        .map((watched) => watched.imdbID)
        .includes(selectedId)

    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating

    function handleAdd() {
        const newWatchedMocie = {
            imdbRating: Number(movie.imdbRating),
            title: movie.Title,
            runtime: Number(movie.Runtime.split(' ').at(0)),
            year: movie.Year,
            Poster: movie.Poster,
            imdbID: selectedId,
            userRating: rating,
        }
        onAddWatched(newWatchedMocie)
        onClose()
    }

    useEffect(
        function () {
            function callBack(e) {
                if (e.code === 'Escape') {
                    onClose()
                    console.log('szdvsdv')
                }
            }
            document.addEventListener('keydown', callBack)
            return function () {
                document.removeEventListener('keydown', callBack)
            }
        },
        [onClose]
    )
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
function WatchedMovie({ movie, onDelete }) {
    return (
        <li>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                </p>
                <button
                    className="btn-delete"
                    onClick={() => onDelete(movie.imdbID)}
                >
                    x
                </button>
            </div>
        </li>
    )
}
