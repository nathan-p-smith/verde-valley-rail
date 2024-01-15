using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities
{
    public partial class BookingSeat
    {
        public int BookingSeatId { get; set; }
        public int BookingId { get; set; }
        public int SeatId { get; set; }
        public int CarId { get; set; }

        public virtual Booking Booking { get; set; } = null!;
        public virtual Car Car { get; set; } = null!;
        public virtual Seat Seat { get; set; } = null!;
    }
}
