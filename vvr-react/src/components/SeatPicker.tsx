import { useState, useContext, useEffect } from "react";
import { Seat } from "../types/Seat";
import "./SeatPicker.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type SeatPickerProps = {
  seats: Seat[];
  selectedSeats: Seat[];
  onSelection: (seats: Seat[]) => void;
};

type Car = {
  carId: number;
  rows: Row[];
};

type Row = {
  row: number;
  seats: Seat[];
};

const SeatPicker: React.FC<SeatPickerProps> = ({
  seats,
  selectedSeats,
  onSelection,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

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
    car: Car;
  }

  const CarMarkup: React.FC<CarProps> = ({ car }) => {
    return (
      <div className="car">
        {car.rows.map((r, index) => (
          <RowMarkup key={`row_${car.carId}_${index}`} row={r}></RowMarkup>
        ))}
      </div>
    );
  };

  interface RowProps {
    row: Row;
  }

  const RowMarkup: React.FC<RowProps> = ({ row }) => {
    return (
      <div className="row">
        {row.seats.map((seat) => (
          <SeatMarkup
            key={`seat_${seat.carId}_${seat.seatId}`}
            seat={seat}
          ></SeatMarkup>
        ))}
      </div>
    );
  };

  interface SeatProps {
    seat: Seat;
  }

  const SeatMarkup: React.FC<SeatProps> = ({ seat }) => {
    console.log("selected", selectedSeats);
    const [selected, setSelected] = useState(
      selectedSeats.some(
        (s) => s.seatId === seat.seatId && s.carId === seat.carId
      )
    );

    function getClassName(): string {
      var className = "seat";

      if (seat.booked) className += " booked";

      if (selected) className += " selected";

      return className;
    }

    const handleClick = async () => {
      if (seat.booked) return;

      if (!selected) {
        onSelection([...selectedSeats, seat]);
      } else {
        onSelection(
          selectedSeats.filter(
            (s) => !(s.seatId === seat.seatId && s.carId === seat.carId)
          )
        );
      }

      setSelected((prevSelected) => !prevSelected);
    };

    return (
      <div className={getClassName()} onClick={handleClick}>
        {seat.position}
      </div>
    );
  };

  const cars: Car[] = [];

  var carIds = Object.keys(carsMap)
    .map((id) => parseInt(id, 10))
    .sort((a, b) => {
      return a - b;
    });

  carIds.forEach((carId) => {
    var car: Car = { carId: carId, rows: [] };

    var rowNums = Object.keys(carsMap[carId])
      .map((id) => parseInt(id, 10))
      .sort((a, b) => {
        return a - b;
      });

    rowNums.forEach((rowNum) => {
      var row: Row = {
        row: rowNum,
        seats: carsMap[carId][rowNum].sort((a: Seat) => a.position),
      };

      car.rows.push(row);
    });

    cars.push(car);
  });

  function handleChooseSeatsClick() {
    setModalVisible(true);
  }

  function handleModalClose() {
    setModalVisible(false);
  }

  return (
    <>
      <Button variant="outlined" onClick={handleChooseSeatsClick}>
        Choose Seats
      </Button>
      <Dialog open={modalVisible} onClose={handleModalClose} scroll="paper">
        <DialogTitle id="scroll-dialog-title">Choose Seats</DialogTitle>
        <DialogContent>
          <div className="seat-picker">
            {cars.map((c) => (
              <CarMarkup key={`car_${c.carId}`} car={c}></CarMarkup>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SeatPicker;
