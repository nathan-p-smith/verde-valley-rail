import { useState, useContext } from "react";
import { Seat } from "../types/Seat";
import "./SeatPicker.scss";

type SeatPickerProps = {
    seats: Seat[],
    onSeatSelected: (seat: Seat) => void;
}

type Car = {
    carId: number,
    rows: Row[]
}

type Row = {
    row: number,
    seats: Seat[]
}

const SeatPicker: React.FC<SeatPickerProps> = ({ seats, onSeatSelected }) => {

    const carsMap: any = {};

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
                {car.rows.map((r) => (
                    <RowMarkup row={r}></RowMarkup>
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
                    <SeatMarkup seat={seat}></SeatMarkup>
                ))}
            </div>
        )
    
    }
    
    interface SeatProps {
        seat: Seat
    }
    
    const SeatMarkup: React.FC<SeatProps> = ({ seat }) => {
    
        var className = "seat";
    
        if(seat.booked)
            className += " booked";
    
        const handleClick = () => {
            onSeatSelected(seat);
        };

        return (
            <div className={className} onClick={handleClick}>
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

    console.log(cars);

    return(
        <div className="seat-picker">
            {cars.map((c) => (
                <CarMarkup car={c}></CarMarkup>
            ))}
        </div>
    )
};

export default SeatPicker;