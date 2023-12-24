// FindTrip.js
import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import api from '../../services/Api';
import { TripGrid } from '../../components/TripGird';
import { TripSearchResult } from '../../types/TripSearchResult';
import { TripSearchFilter } from '../../types/TripSearchFilter';
import StationSelect from '../../components/StationSelect';
import * as Mui from "@mui/material";
import "./_find-trip.scss";

const FindTrip = () => {

    
    
    const [firstRun, setFirstRun] = useState<Boolean>(true);
    const [trips, setTrips] = useState<TripSearchResult[]>([]);
    const [tripSearchFilter, setTripSearchFilter] = useState<TripSearchFilter>({
      startStationId: null,
      endStationId: null,
      departure: null
    });

    async function searchTrips(){
      var tripResults = (await api.searchTrips(tripSearchFilter)).data;
      setTrips(tripResults);
    }

    useEffect(() => {

        if(firstRun){
            setFirstRun(false); 
            return;
        }

        console.log("api");
        searchTrips();
        

    }, [tripSearchFilter])


    function onStationSelectChange(event : any){
      setTripSearchFilter({ ...tripSearchFilter, [event.target.name]: event.target.value });
    }
    

  return (
    <div className='find-trip'>

      <h2>Find Trip Page</h2>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        
      <Mui.Stack className='search-controls' direction="row" spacing={2}>
        <DatePicker 
          label="Depart On"
          className='search-controls__date-picker'
          value={tripSearchFilter.departure}        
          onChange={(departure) => { setTripSearchFilter({...tripSearchFilter, departure: departure}) }}          
          />
        <StationSelect name="startStationId" value={tripSearchFilter.startStationId} label='Starting Point' onChange={onStationSelectChange} />
        <StationSelect name="endStationId" value={tripSearchFilter.endStationId} label='Destination' onChange={onStationSelectChange} />
      </Mui.Stack>



        

        <TripGrid trips={trips} />        


    </LocalizationProvider>
    

    </div>
  );
};

export default FindTrip;
