export default function WatchedMovie({ watche, onDelete }) {
    return (
        <li>
            <img src={watche.Poster} alt={`${watche.title} poster`} />
            <h3>{watche.title}</h3>
            <div className="watchedli">
                <p>
                    <span>⭐️</span>
                    <span>{watche.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{watche.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{watche.runtime} min</span>
                </p>
                <p>
                    <button
                        className="btn-delete"
                        onClick={() => onDelete(watche.imdbID)}
                    >
                        x
                    </button>
                </p>
                <p>{watche.counrRatingDecisions}</p>
            </div>
        </li>
    )
}
