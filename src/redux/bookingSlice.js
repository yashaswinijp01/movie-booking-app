import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    bookedSeats: [],
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
      state.bookedSeats.push(...action.payload.seats);
    },
    cancelBooking: (state, action) => {
      const cancelTicketBooking = state.bookings.find(booking => booking.id === action.payload);
      if (cancelTicketBooking) {
        state.bookedSeats = state.bookedSeats.filter(seat => !cancelTicketBooking.seats.includes(seat));
      }
      state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
    },
  },
});

export const { addBooking, cancelBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
