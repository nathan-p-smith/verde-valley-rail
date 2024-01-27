// FindTrip.js
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PriceDisplay from "../../components/PriceDisplay";
import SeatPicker from "./SeatPicker";
import { useAuth } from "../../context/AuthContext";
import { Seat } from "../../types/Seat";
import { Trip } from "../../types/Trip";
import formatDuration from "../../utils/FormatDuration";
import api from "../../services/Api";
import cartService from "../../services/ShoppingCartService";
import "./_trip-detail.scss";
import { BookingCreate } from "../../types/BookingCreate";
import { BookingSeat } from "../../types/BookingSeat";

const TripDetail = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | null>();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const { customer, setTotalCartItems } = useAuth();
  const navigateTo = useNavigate();

  if (!tripId) throw "";

  useEffect(() => {
    const load = async () => {
      const tripResponse = await api.getTrip(parseInt(tripId, 10));

      setTrip(tripResponse.data);
    };

    load();
  }, []);

  useEffect(() => {
    var booking = cartService
      .getCart()
      .find((b) => b.tripId == parseInt(tripId, 10));

    if (booking) {
      setSelectedSeats(
        trip?.seats.filter((s) =>
          booking?.bookingSeats?.some(
            (b) => b.carId == s.carId && b.seatId == s.seatId
          )
        ) ?? []
      );
    }
  }, [trip]);

  const onSelection = (seats: Seat[]) => {
    setSelectedSeats(seats);
  };

  function handleBookTrip() {
    var booking: BookingCreate = {
      tripId: parseInt(tripId!),
      bookingSeats: selectedSeats.map((s): BookingSeat => {
        return { carId: s.carId, seatId: s.seatId };
      }),
    };

    cartService.upsertToCart(booking);
    setTotalCartItems(cartService.getCart().length);

    if (customer) {
      navigateTo("/checkout");
      return;
    }

    navigateTo(`/login?then=${encodeURIComponent("/checkout")}`);
  }

  return (
    <div className="trip-detail container">
      {!trip ? (
        <LinearProgress color="inherit" />
      ) : (
        <div>
          <Typography variant="h1" className="page-header">
            {trip?.route.startStation.name} to {trip?.route.endStation.name}
          </Typography>

          <Typography sx={{ mb: 3 }}></Typography>

          <Box mb={2}>
            <Stack direction="row" alignItems="center" marginBottom={1} gap={1}>
              <AccessTimeIcon />
              <Typography>
                Travel Time {formatDuration(trip.route.minutes)}
              </Typography>
            </Stack>

            {selectedSeats.length > 0 ? (
              <>
                <Stack
                  direction="row"
                  alignItems="center"
                  marginBottom={1}
                  gap={1}
                >
                  <AirlineSeatReclineNormalIcon />
                  <Typography>Seats {selectedSeats.length}</Typography>
                </Stack>
                <PriceDisplay
                  value={trip.pricePerSeat * selectedSeats.length}
                ></PriceDisplay>
              </>
            ) : null}
          </Box>

          <div></div>

          <Box mb={2}>
            {trip?.seats ? (
              <SeatPicker
                key="seat_picker"
                seats={trip!.seats}
                selectedSeats={selectedSeats}
                onSelection={onSelection}
              ></SeatPicker>
            ) : null}
          </Box>

          {selectedSeats.length > 0 ? (
            <Button variant="contained" onClick={handleBookTrip}>
              Book Trip
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default TripDetail;
