using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities
{
    public partial class VwTripSeat
    {
        public int TripId { get; set; }
        public int TrainId { get; set; }
        public int CarId { get; set; }
        public int SeatId { get; set; }
        public int Row { get; set; }
        public string Position { get; set; } = null!;
        public int? BookingSeatId { get; set; }
    }
}
