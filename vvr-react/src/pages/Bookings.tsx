import { useEffect, useState } from "react";
import api from "../services/Api";
import { Booking } from "../types/Booking";
import BookingDisplay from "../components/BookingDisplay/BookingDisplay";
import { Typography } from "@mui/material";

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

      <Typography sx={{ mb: 3 }}>
        Thanks for booking your travels with Verde Valley Rail. Here are your
        upcoming trips!
      </Typography>

      {bookings.length > 0
        ? bookings?.map((b) => <BookingDisplay booking={b}></BookingDisplay>)
        : null}
    </div>
  );
};

export default Bookings;
