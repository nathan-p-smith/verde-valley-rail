using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities;

public partial class Booking
{
    public int BookingId { get; set; }

    public int TripId { get; set; }

    public int CustomerId { get; set; }

    public string? BookingGuid { get; set; }

    public virtual ICollection<BookingSeat> BookingSeats { get; set; } = new List<BookingSeat>();

    public virtual Customer Customer { get; set; } = null!;

    public virtual Trip Trip { get; set; } = null!;
}
