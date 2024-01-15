using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities
{
    public partial class Booking
    {
        public Booking()
        {
            BookingSeats = new HashSet<BookingSeat>();
            InvoiceBookings = new HashSet<InvoiceBooking>();
        }

        public int BookingId { get; set; }
        public int TripId { get; set; }
        public int CustomerId { get; set; }
        public Guid BookingGuid { get; set; }

        public virtual Customer Customer { get; set; } = null!;
        public virtual Trip Trip { get; set; } = null!;
        public virtual ICollection<BookingSeat> BookingSeats { get; set; }
        public virtual ICollection<InvoiceBooking> InvoiceBookings { get; set; }
    }
}
