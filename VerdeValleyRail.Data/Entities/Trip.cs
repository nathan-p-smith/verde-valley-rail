using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities;

public partial class Trip
{
    public int TripId { get; set; }

    public int RouteId { get; set; }

    public DateTime Departure { get; set; }

    public decimal PricePerSeat { get; set; }

    public int TrainId { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual Route Route { get; set; } = null!;
}
