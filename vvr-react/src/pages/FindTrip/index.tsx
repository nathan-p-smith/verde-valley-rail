// FindTrip.js
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Box, Grid, Icon, Stack, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StationSelect from "../../components/StationSelect";
import api from "../../services/Api";
import { TripSearchFilter } from "../../types/TripSearchFilter";
import { TripSearchResult } from "../../types/TripSearchResult";
import { TripGrid } from "./TripGrid";
import "./_find-trip.scss";

const FindTrip = () => {
  const navigateTo = useNavigate();
  const [trips, setTrips] = useState<TripSearchResult[]>([]);
  const [tripSearchFilter, setTripSearchFilter] = useState<TripSearchFilter>({
    startStationId: null,
    endStationId: null,
    departure: dayjs(new Date("2023-8-2")),
  });

  async function searchTrips() {
    var tripResults = await api.searchTrips(tripSearchFilter);
    setTrips(tripResults);
  }

  useEffect(() => {
    searchTrips();
  }, [tripSearchFilter]);

  function onStationSelectChange(event: any) {
    setTripSearchFilter({
      ...tripSearchFilter,
      [event.target.name]: event.target.value,
    });
  }

  const handleRowClick = (tripId: number) => {
    navigateTo(`/trip-detail/${tripId}`);
  };

  return (
    <div className="find-trip">
      <Box className="search-controls">
        <Box className="container">
          <Typography variant="h1" className="page-header">
            Trips
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="Depart On"
                  className="search-controls__date-picker"
                  value={tripSearchFilter.departure}
                  onChange={(departure) => {
                    setTripSearchFilter({
                      ...tripSearchFilter,
                      departure: departure,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StationSelect
                  name="startStationId"
                  value={tripSearchFilter.startStationId}
                  label="Starting Point"
                  onChange={onStationSelectChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <StationSelect
                  name="endStationId"
                  value={tripSearchFilter.endStationId}
                  label="Destination"
                  onChange={onStationSelectChange}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Box>
      </Box>
      <Box className="container">
        {trips.length > 0 ? (
          <TripGrid trips={trips} onRowClick={handleRowClick} />
        ) : (
          <Box className="find-trip__no-results container">
            <Stack direction="row">
              <Box mr={2}>
                <SentimentVeryDissatisfiedIcon />
              </Box>
              <Typography>
                We're sorry, there are no trips for your criteria.
              </Typography>
            </Stack>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default FindTrip;
