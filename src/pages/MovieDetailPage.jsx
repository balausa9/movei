import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = '2d7fe9381a7344f73b0c649e50f75c40';

const MovieDetailPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchMovie = async () => {
        try {
            setIsLoading(true);

            // Негізгі фильм мәліметі
            const movieRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
            setMovie(movieRes.data);

            // 🎬 Видео (трейлер) сұранысы
            const videoRes = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
            const videos = videoRes.data.results;

            // YouTube трейлер іздеу
            const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            if (trailer) {
                setTrailerKey(trailer.key);
            }

            setError('');
        } catch (error) {
            setError(`Қате шықты: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovie();
    }, [id]);

    if (isLoading) return <p className="loading">Жүктелуде...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!movie) return null;

    return (
        <div className="movie_detail_container">
            <div className="movie_detail_card">
                <img 
                    className="movie_detail_poster"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                />
                <div className="movie_detail_info">
                    <h1 className="movie_detail_title">{movie.title}</h1>
                    <p className="movie_detail_rating"><strong>★ Рейтинг:</strong> {movie.vote_average}</p>
                    <p className="movie_detail_release"><strong>🗓️ Шығарылған жылы:</strong> {movie.release_date}</p>
                    <p className="movie_detail_overview"><strong>📝 Сюжет:</strong> {movie.overview}</p>

                    {trailerKey && (
                        <div className="movie_trailer">
                            <h3>🎬 Трейлер</h3>
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${trailerKey}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
