// FindTrip.js
import { Box, Grid, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import StationSelect from "../../components/StationSelect";
import { TripGrid } from "./TripGrid";
import { TripSearchFilter } from "../../customTypes/TripSearchFilter";
import { TripSearchResult } from "../../customTypes/TripSearchResult";
import api from "../../services/Api";
import "./_find-trip.scss";
import { useNavigate } from "react-router-dom";

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
          <div>We're sorry, there are no trips for your criteria.</div>
        )}
      </Box>
    </div>
  );
};

export default FindTrip;
