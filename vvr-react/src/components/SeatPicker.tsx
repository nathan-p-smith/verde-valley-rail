import { useState, useContext, useEffect } from "react";
import { Seat } from "../types/Seat";
import "./SeatPicker.scss";

type SeatPickerProps = {
    seats: Seat[],    
    selectedSeats:Seat[],
    onSeatSelected: (seat: Seat) => void;    
    onSelection: (seats: Seat[]) => void;
}

type Car = {
    carId: number,
    rows: Row[]
}

type Row = {
    row: number,
    seats: Seat[]
}



const SeatPicker: React.FC<SeatPickerProps> = ({ seats, selectedSeats, onSeatSelected, onSelection }) => {


    const carsMap: any = {};

    //const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);    
    

    useEffect(() => {
        console.log("Seat Picker rerender");
    });

    // Iterate through the seats and organize them by CarId, Row, and Position
    seats.forEach((seat) => {
        const { carId, row, position } = seat;

        if (!carsMap[carId]) {
            carsMap[carId] = {};
        }

        if (!carsMap[carId][row]) {
            carsMap[carId][row] = [];
        }

        carsMap[carId][row].push(seat);
    });

    interface CarProps {
        car: Car
    }
    
    const CarMarkup: React.FC<CarProps> = ({ car }) => {
        return (
            <div className="car">
                {car.rows.map((r, index) => (
                    <RowMarkup key={`row_${car.carId}_${index}`} row={r}></RowMarkup>
                ))}
            </div>
        )
    }
    
    interface RowProps {
        row: Row
    }
    
    const RowMarkup: React.FC<RowProps> = ({ row }) => {
    
        return(
            <div className="row">                
                {row.seats.map((seat) => (                                
                    <SeatMarkup key={`seat_${seat.carId}_${seat.seatId}`} seat={seat}></SeatMarkup>
                ))}
            </div>
        )
    
    }
    
    interface SeatProps {
        seat: Seat
    }
    
    const SeatMarkup: React.FC<SeatProps> = ({ seat }) => {
    
        var seatIsSelected = selectedSeats.some(s => s.seatId === seat.seatId && s.carId === seat.carId);

        const [selected, setSelected] = useState(seatIsSelected);

        function getClassName():string{

            var className = "seat";

            if(seat.booked)
                className += " booked";
        
            
            // if(selectedSeats.find(s => s.seatId == seat.seatId && s.carId == seat.carId)){
            //     className += " selected";            
            // }

            if(selected)
                className += " selected";

            return className;
        }

        const handleClick = async () => {

            if(seat.booked)
                return;

            // if(!selectedSeats.find(s => s.seatId == seat.seatId && s.carId == seat.carId)){
            //     //If the seat wasn't selected, add it to selected seats.
            //     setSelectedSeats([...selectedSeats, seat]);                
            // }
            // else{
            //     //Otherwise, remove it
            //     setSelectedSeats(selectedSeats.filter(s => !(s.seatId == seat.seatId && s.carId == seat.carId)));
            // }         
            
            
            if(!selected){
                onSelection([...selectedSeats, seat]);                
                console.log("!selected");
            }
            else
            {
                onSelection(selectedSeats.filter(s => !(s.seatId === seat.seatId && s.carId === seat.carId)));                
                console.log("1selected");
            }

            
            

            // await setSelectedSeats(prevSeats => {
            //     console.log(selected);
            //     if (!selected) {
            //       return [...prevSeats, seat];
            //     } else {
            //       return prevSeats.filter(s => !(s.seatId === seat.seatId && s.carId === seat.carId));
            //     }
            // });

            setSelected(prevSelected => !prevSelected);

            //onSelection(selectedSeats);

            //onSeatSelected(seat);
        };

        return (
            <div className={getClassName()} onClick={handleClick}>
                {seat.position}
            </div>
        )
    };

    const cars: Car[] = [];

    var carIds = Object.keys(carsMap).map((id) => parseInt(id, 10)).sort((a, b) => {return a - b});

    carIds.forEach((carId) => {

        var car: Car = { carId: carId, rows: [] };

        var rowNums = Object.keys(carsMap[carId]).map((id) => parseInt(id, 10)).sort((a, b) => {return a - b});
        
        rowNums.forEach((rowNum) => {

            var row: Row = {
                row: rowNum,
                seats: carsMap[carId][rowNum].sort((a: Seat) => a.position)
            }

            car.rows.push(row);

        });  
        
        cars.push(car);
    });

    

    return(
        <div className="seat-picker">
            {cars.map((c) => (
                <CarMarkup key={`car_${c.carId}`} car={c}></CarMarkup>
            ))}
        </div>
    )
};

export default SeatPicker;