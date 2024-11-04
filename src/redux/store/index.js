import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from '../bookingSlice';
import movieReducer from '../movieSlice';

const store = configureStore({
  reducer: {
    bookings: bookingReducer,
    movies: movieReducer,
  },
});

export default store;
