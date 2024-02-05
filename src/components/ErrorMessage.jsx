export default function ErrorMessage({ message }) {
    return (
        <p className="error">
            <span>
                <dotlottie-player
                    src="https://lottie.host/da0c42e1-345c-4c9d-8f1d-4c6294e5d972/B4vtNRT0xo.json"
                    background="transparent"
                    speed="1"
                    style={{
                        width: '50px',
                        height: '50px',
                    }}
                    loop
                    autoplay
                ></dotlottie-player>
            </span>
            {message}
        </p>
    )
}
