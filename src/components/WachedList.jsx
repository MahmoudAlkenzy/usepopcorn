import WatchedMovie from './WatchedMovie'

export default function WatchedList({ watched, onDelete }) {
    return (
        <ul className="list">
            {watched.map((watche) => (
                <WatchedMovie
                    onDelete={onDelete}
                    watche={watche}
                    key={watche.imdbID}
                />
            ))}
        </ul>
    )
}
