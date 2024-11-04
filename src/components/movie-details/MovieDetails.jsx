import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../redux/movieSlice';
import BookingModal from '../booking-modal/BookingModal';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.items.find((movie) => movie.id === parseInt(id)));
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    if (!movie) {
      dispatch(fetchMovieDetails(id));
    }
  }, [dispatch, id, movie]);

  const handleBookTicket = () => {
    setShowBookingModal(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movie-details">
      <h2>{movie.movie}</h2>
      <img className="movie-image" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.movie} />
      <p><span style={{color:'Red'}}>Rating : </span>{movie.vote_average}/10</p>
      <p><span style={{color:'Red'}}>Release Date : </span>{movie.release_date}</p>
      <p><span style={{color:'Red'}}>Overview : </span>{movie.overview}</p>
      <button onClick={handleBookTicket}>Book Ticket</button>
      {showBookingModal && <BookingModal movie={movie} onClose={() => setShowBookingModal(false)} />}
    </div>
  );
};

export default MovieDetails;
