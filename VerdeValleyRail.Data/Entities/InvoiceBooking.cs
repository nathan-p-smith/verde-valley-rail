using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities
{
    public partial class InvoiceBooking
    {
        public int InvoiceBookingId { get; set; }
        public int InvoiceId { get; set; }
        public int BookingId { get; set; }

        public virtual Booking Booking { get; set; } = null!;
        public virtual Invoice Invoice { get; set; } = null!;
    }
}
