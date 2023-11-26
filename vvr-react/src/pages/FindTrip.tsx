// FindTrip.js
import { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import api from '../services/Api';
import { TripGrid } from '../components/TripGird';
import { TripSearchResult } from '../types/TripSearchResult';
import { TripSearchFilter } from '../types/TripSearchFilter';
import StationSelect from '../components/StationSelect';

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
    <div>
      <h2>Find Trip Page</h2>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        
      <DatePicker 
        label="Controlled picker"
        value={tripSearchFilter.departure}        
        onChange={(departure) => { setTripSearchFilter({...tripSearchFilter, departure: departure}) }}
        />

        <StationSelect name="startStationId" value={tripSearchFilter.startStationId} onChange={onStationSelectChange} />

        <StationSelect name="endStationId" value={tripSearchFilter.endStationId} onChange={onStationSelectChange} />

        <TripGrid trips={trips} />        


    </LocalizationProvider>
    

    </div>
  );
};

export default FindTrip;
