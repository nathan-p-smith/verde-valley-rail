export type TripSearchResult = {
    tripId: number;
    trainId: number;
    departure: Date;
    startingStationName: string;
    endingStationName: string;
    pricePerSeat: number;
    minutes: number;
    availableSeats: number;    
};