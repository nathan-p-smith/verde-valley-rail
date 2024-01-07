import { useEffect, useState } from "react";
import api from "../services/Api";
import { Booking } from "../customTypes/Booking";
import BookingDisplay from "../components/BookingDisplay/BookingDisplay";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const loadBookings = async () => {
    var bookingsResponse = await api.getCustomerBookings();
    setBookings(bookingsResponse.data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div>
      <Typography variant="h1" className="page-header">
        My Trips
      </Typography>

      {bookings.length > 0 ? (
        <>
          <Typography sx={{ mb: 3 }}>
            Thanks for booking your travels with Verde Valley Rail. Here are
            your upcoming trips!
          </Typography>
          {bookings?.map((b) => (
            <BookingDisplay booking={b}></BookingDisplay>
          ))}
        </>
      ) : (
        <Typography>
          You don't have any upcoming trips booked with us.{" "}
          <a href="/find-trip">Click here</a> to find your next destination.
        </Typography>
      )}
    </div>
  );
};

export default Bookings;
