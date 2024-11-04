import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../redux/movieSlice";
import { Link } from "react-router-dom";
import './MovieList.css';

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.items);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div className="movie-card" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.movie} />
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-rating">Rating: {movie.vote_average}/10</p>
          <Link className="view-details" to={`/movies/${movie.id}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
