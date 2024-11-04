import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelBooking } from '../../redux/bookingSlice';
import "./BookingHistory.css";
import { Link } from 'react-router-dom/dist';

const BookingHistory = () => {
  const bookings = useSelector((state) => state.bookings.bookings);
  const dispatch = useDispatch();

  const handleCancelBooking = (id) => {
    dispatch(cancelBooking(id));
  };

  return (
    <div>
      <h2>Tickets Booking History</h2>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className='history'>
          <ul className="booking-history">
          {bookings.map((booking) => (
              <li key={booking.id} >
              Movie - {booking.movie}  , 
              Showtime - {booking.showtime}  , 
              Seats - {booking.seats.join(', ')}   
              <button className="cancel-booking" onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</button>
            </li>
          ))}
          </ul>
          </div>
      )}
      <footer>
      <Link className="back-to-movies" to={`/`}>Back to Movies Page </Link>
      </footer>
    </div>
  );
};

export default BookingHistory;
