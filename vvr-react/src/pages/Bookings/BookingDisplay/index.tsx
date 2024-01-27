import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlightClassIcon from "@mui/icons-material/FlightClass";
import { Box, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { Booking } from "../../../types/Booking";
import { BookingSeat } from "../../../types/BookingSeat";
import "./_booking-display.scss";

type BookingDisplayProps = {
  booking: Booking;
};

export default function CheckoutBooking({ booking }: BookingDisplayProps) {
  const getTripDescription = () => {
    return `${booking.trip.route.startStation.name} to ${booking.trip.route.endStation.name}`;
  };

  return (
    <div className="booking-display">
      <Box className="booking-display__info-block" sx={{ mb: 2 }}>
        <Typography
          className="booking-display__trip-description"
          sx={{ mb: 2 }}
        >
          {getTripDescription()}
        </Typography>
        <Stack direction="row" alignItems="center" marginBottom={1} gap={1}>
          <AccessTimeIcon />
          <Typography>
            Departure:{" "}
            {format(new Date(booking.trip.departure), "MM/dd/yyyy h:mm aa")}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" marginBottom={1} gap={1}>
          <FlightClassIcon />
          <Typography>Seats ({booking.bookingSeats.length})</Typography>
        </Stack>
      </Box>

      <Typography>
        {booking.bookingSeats.map((s: BookingSeat) => (
          <div className="booking-display__seat">
            {s.row}-{s.position}
          </div>
        ))}
      </Typography>
    </div>
  );
}
