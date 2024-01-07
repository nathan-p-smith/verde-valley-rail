// FindTrip.js
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import api from "../../services/Api";
import { TripGrid } from "../../components/TripGird";
import { TripSearchResult } from "../../customTypes/TripSearchResult";
import { TripSearchFilter } from "../../customTypes/TripSearchFilter";
import StationSelect from "../../components/StationSelect";
import { Trip } from "../../customTypes/Trip";
import SeatPicker from "../../components/SeatPicker";
import { Seat } from "../../customTypes/Seat";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import cartService from "../../services/ShoppingCartService";
import { Booking } from "../../customTypes/Booking";
import { BookingSeat } from "../../customTypes/BookingSeat";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import formatDuration from "../../helpers/FormatDuration";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import "./_trip-detail.scss";
import PriceDisplay from "../../components/PriceDisplay/PriceDisplay";

const TripDetail = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | null>();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const { customer, setCustomer } = useAuth();
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
          booking?.bookingSeats.some(
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
    var booking = {
      tripId: parseInt(tripId!),
      bookingSeats: selectedSeats.map((s) => {
        return { carId: s.carId, seatId: s.seatId };
      }),
    };

    cartService.upsertToCart(booking);

    if (customer) {
      navigateTo("/checkout");
      return;
    }

    navigateTo(`/login?then=${encodeURIComponent("/checkout")}`);
  }

  return (
    <div className="trip-detail">
      {!trip ? (
        <LinearProgress color="inherit" />
      ) : (
        <div>
          <Typography variant="h1" className="page-header">
            {trip?.route.startStation.name} to {trip?.route.endStation.name}
          </Typography>

          <Typography sx={{ mb: 3 }}>
            Thanks for booking your travels with Verde Valley Rail. Here are
            your upcoming trips!
          </Typography>

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
