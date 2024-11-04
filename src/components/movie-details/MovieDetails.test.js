// MovieDetails.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import { fetchMovieDetails } from '../../redux/movieSlice';
import BookingModal from '../booking-modal/BookingModal';
import { Routes } from 'react-router-dom/dist';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../redux/movieSlice', () => ({
  fetchMovieDetails: jest.fn(),
}));

jest.mock('../booking-modal/BookingModal', () => ({ movie, onClose }) => (
  <div>
    <h2>Booking Modal for {movie.movie}</h2>
    <button onClick={onClose}>Close</button>
  </div>
));

const mockDispatch = jest.fn();

beforeEach(() => {
  useDispatch.mockReturnValue(mockDispatch);
});

afterEach(() => {
  jest.clearAllMocks();
});

const renderMovieDetailsWithParams = (initialState, id) => {
  useSelector.mockImplementation((selector) => selector(initialState));
  render(
    <MemoryRouter initialEntries={[`/movies/${id}`]}>
        <Routes>
      <Route path="/movies/:id">
        <MovieDetails />
      </Route>
      </Routes>
    </MemoryRouter>
  );
};

test('renders loading state', () => {
  renderMovieDetailsWithParams({ movies: { loading: true } }, 1);
  expect(screen.getByText(/Loading.../)).toBeInTheDocument();
});

test('renders error message', () => {
  renderMovieDetailsWithParams({ movies: { loading: false, error: 'Failed to fetch' } }, 1);
  expect(screen.getByText(/Error: Failed to fetch/)).toBeInTheDocument();
});

test('renders movie details', () => {
  const movie = {
    id: 1,
    movie: 'Inception',
    poster_path: '/poster.jpg',
    vote_average: 8.8,
    release_date: '2010-07-16',
    overview: 'A mind-bending thriller.',
  };
  renderMovieDetailsWithParams({ movies: { loading: false, error: null, items: [movie] } }, 1);
  
  expect(screen.getByText(/Inception/)).toBeInTheDocument();
  expect(screen.getByText(/Rating : 8.8\/10/)).toBeInTheDocument();
  expect(screen.getByText(/Release Date : 2010-07-16/)).toBeInTheDocument();
  expect(screen.getByText(/Overview : A mind-bending thriller./)).toBeInTheDocument();
  expect(screen.getByRole('img')).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/poster.jpg');
});

test('opens booking modal when button is clicked', () => {
  const movie = {
    id: 1,
    movie: 'Inception',
    poster_path: '/poster.jpg',
    vote_average: 8.8,
    release_date: '2010-07-16',
    overview: 'A mind-bending thriller.',
  };
  renderMovieDetailsWithParams({ movies: { loading: false, error: null, items: [movie] } }, 1);
  
  fireEvent.click(screen.getByText(/Book Ticket/));
  
  expect(screen.getByText(/Booking Modal for Inception/)).toBeInTheDocument();
  
  fireEvent.click(screen.getByText(/Close/));
  
  expect(screen.queryByText(/Booking Modal for Inception/)).not.toBeInTheDocument();
});
