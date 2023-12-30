// FindTrip.js
import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import api from "../../services/Api";
import { TripGrid } from "../../components/TripGird";
import { TripSearchResult } from "../../types/TripSearchResult";
import { TripSearchFilter } from "../../types/TripSearchFilter";
import StationSelect from "../../components/StationSelect";
import "./_find-trip.scss";
import { Grid, Stack, Typography } from "@mui/material";

const FindTrip = () => {
  const [firstRun, setFirstRun] = useState<Boolean>(true);
  const [trips, setTrips] = useState<TripSearchResult[]>([]);
  const [tripSearchFilter, setTripSearchFilter] = useState<TripSearchFilter>({
    startStationId: null,
    endStationId: null,
    departure: null,
  });

  async function searchTrips() {
    var tripResults = await api.searchTrips(tripSearchFilter);
    setTrips(tripResults);
  }

  useEffect(() => {
    if (firstRun) {
      setFirstRun(false);
      return;
    }

    console.log("api");
    searchTrips();
  }, [tripSearchFilter]);

  function onStationSelectChange(event: any) {
    setTripSearchFilter({
      ...tripSearchFilter,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="find-trip">
      <Typography variant="h1" className="page-header">
        Find Trip Page
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2}>
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

        {trips.length > 0 ? (
          <TripGrid trips={trips} />
        ) : (
          <div>We're sorry, there are no trips for your criteria.</div>
        )}
      </LocalizationProvider>
    </div>
  );
};

export default FindTrip;
