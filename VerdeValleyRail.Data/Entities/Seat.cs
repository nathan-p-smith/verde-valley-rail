using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities
{
    public partial class Seat
    {
        public Seat()
        {
            BookingSeats = new HashSet<BookingSeat>();
        }

        public int SeatId { get; set; }
        public int CarTypeId { get; set; }
        public int Row { get; set; }
        public string Position { get; set; } = null!;

        public virtual CarType CarType { get; set; } = null!;
        public virtual ICollection<BookingSeat> BookingSeats { get; set; }
    }
}
