import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BookingDisplay from "./BookingDisplay";
import { Booking } from "../../types/Booking";
import api from "../../services/Api";
import { Link } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const loadBookings = async () => {
    var bookingsResponse = await api.getCustomerBookings(new Date());
    setBookings(bookingsResponse.data);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await loadBookings();
      setLoading(false);
    };

    load();
  }, []);

  return (
    <Box className="container" mb={5}>
      <Typography variant="h1" className="page-header">
        My Trips
      </Typography>

      {loading ? (
        <LinearProgress color="inherit" />
      ) : (
        <>
          {bookings.length > 0 ? (
            <Box>
              <Typography sx={{ mb: 3 }}>
                Thanks for booking your travels with Verde Valley Rail. Here are
                your upcoming trips!
              </Typography>
              {bookings?.map((b) => (
                <BookingDisplay booking={b}></BookingDisplay>
              ))}
            </Box>
          ) : (
            <Typography>
              You don't have any upcoming trips booked with us.{" "}
              <Link to="/find-trip">Click here</Link> to find your next
              destination.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Bookings;
