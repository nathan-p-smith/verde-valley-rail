﻿using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities
{
    public partial class Car
    {
        public Car()
        {
            BookingSeats = new HashSet<BookingSeat>();
            TrainCars = new HashSet<TrainCar>();
        }

        public int CarId { get; set; }
        public int CarTypeId { get; set; }

        public virtual CarType CarType { get; set; } = null!;
        public virtual ICollection<BookingSeat> BookingSeats { get; set; }
        public virtual ICollection<TrainCar> TrainCars { get; set; }
    }
}
