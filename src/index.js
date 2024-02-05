import React from 'react'
import ReactDOM from 'react-dom/client'
// import StarRating from './StarOfRating'
import './index.css'
import App from './App'

// function Test() {
//     const [rate, setRate] = useState(0)
//     return (
//         <div>
//             <StarRating color="blue" onSetRate={setRate} />
//             <p>This movie was rating {rate} Star</p>
//         </div>
//     )
// }
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        {/* <StarRating
            maxRating={5}
            messages={['Terrible', 'Bad', 'okey', 'Good', 'Amazing']}
            defultRate={3}
        />
        <Test /> */}

        <App />
    </React.StrictMode>
)
