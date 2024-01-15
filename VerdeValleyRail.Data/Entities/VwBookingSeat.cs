using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities
{
    public partial class VwBookingSeat
    {
        public int TripId { get; set; }
        public int BookingId { get; set; }
        public int BookingSeatId { get; set; }
        public int SeatId { get; set; }
        public int CarId { get; set; }
        public int Row { get; set; }
        public string Position { get; set; } = null!;
    }
}
