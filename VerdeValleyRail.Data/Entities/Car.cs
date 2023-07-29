using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities;

public partial class Car
{
    public int CarId { get; set; }

    public int CarTypeId { get; set; }

    public virtual ICollection<BookingSeat> BookingSeats { get; set; } = new List<BookingSeat>();

    public virtual CarType CarType { get; set; } = null!;

    public virtual ICollection<TrainCar> TrainCars { get; set; } = new List<TrainCar>();
}
