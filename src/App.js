import { useState } from 'react'

import { useMovies } from './custom/useMovies'
import { useLocalStorageState } from './custom/useLocalStorageState'

import Main from './components/Main'
import ErrorMessage from './components/ErrorMessage'
import Loader from './components/Loader'
import MovieList from './components/MovieList'
import Box from './components/Box'
import MovieDetails from './components/MovieDeatels'
import WatchedSummary from './components/WatchedSummary'
import WatchedList from './components/WachedList'
import NavBar from './components/NavBar'

const Key = '143a7870'

export default function App() {
    const [query, setQuery] = useState('')
    const [selectedId, setSelectedId] = useState(null)

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
    const [watched, setWatched] = useLocalStorageState([], 'watched')

    const { isloding, movies, error } = useMovies(query, handleClose)

    return (
        <>
            <NavBar query={query} setQuery={setQuery} movies={movies} />
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
                            Key={Key}
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
