import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BookingDisplay from "./BookingDisplay";
import { Booking } from "../../customTypes/Booking";
import api from "../../services/Api";

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const loadBookings = async () => {
    var bookingsResponse = await api.getCustomerBookings();
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
    <Box className="container">
      <Typography variant="h1" className="page-header">
        My Trips
      </Typography>

      {loading ? (
        <LinearProgress color="inherit" />
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
};

export default Bookings;
