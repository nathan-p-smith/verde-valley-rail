import React, { useEffect, useState } from 'react';
import * as Mui from '@mui/material';
import api from '../services/Api';
import { StationOption } from '../types/StationOption';

type StationSelectProps = {    
    value: number | null;
    name: string | undefined;
    label: string | undefined;
    onChange: Function | null;
}

const StationSelect: React.FC<StationSelectProps> = ({ value, name, label, onChange }) => {
  // Your array of objects

    label = label ?? "Select an option";

    const [options, setOptions] = useState<StationOption[]>([]);

    async function getStationOptions(){
        var stationOptions = (await api.listStationOptions()).data;
        setOptions(stationOptions);
    }

    useEffect(() => {

        getStationOptions();

    }, []);

  
  // State to manage the selected value
  const [selectedValue, setSelectedValue] = React.useState<number | null>(value);

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);

    if(onChange)
        onChange(event);
  };

  

  return (
    <Mui.FormControl fullWidth>
      <Mui.InputLabel id="select-label">{ label }</Mui.InputLabel>
      <Mui.Select
        labelId="select-label"
        id="select"
        value={selectedValue}       
        label={ label }
        name={name}
        onChange={handleChange}        
      >
        {options.map((option) => (
          <Mui.MenuItem key={option.stationId} value={option.stationId}>
            {option.name}
          </Mui.MenuItem>
        ))}
      </Mui.Select>
    </Mui.FormControl>
  );
};

export default StationSelect;
