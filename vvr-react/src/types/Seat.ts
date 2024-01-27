export type Seat = {
    carId: number;
    seatId: number;
    row: number;
    position: Position;
    booked: boolean;
};

export enum Position {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
}