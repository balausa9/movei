import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = '2d7fe9381a7344f73b0c649e50f75c40';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;


const HomePage = () => {
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchMovies = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(API_URL)

            setMovies(response.data.results)
            console.log(response.data.results)
            setError('')
        } catch (error) {
            setError(`Фильмдерді алғанда қате шықты ${error.message}`)
        } finally {
            setIsLoading(false)
        }
    }

    // Серверден фильмдерде аламыз компонента mount болғанда
    useEffect(() => {
        fetchMovies()
    }, [])
    
    return (
        <div>
            <h1>Каталог фильмов</h1>

            <div className="movie_list">
                {movies.map(movie => (
                    <Link to={`/movies/${movie.id}`} className="movie" key={movie.id}>
                        <img 
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title} 
                        />
                        <h3>{movie.title}</h3>
                        <p>★ {movie.vote_average}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default HomePage