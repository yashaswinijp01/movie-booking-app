import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MovieList from './components/movie-list/MovieList';
import MovieDetails from './components/movie-details/MovieDetails';
import BookingHistory from './components/booking-history/BookingHistory';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/bookings" element={<BookingHistory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
