﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VerdeValleyRail.Business.Resources
{
    public class TripSeat
    {
        public int CarId { get; set; }

        public int SeatId { get; set; }

        public int Row { get; set; }

        public string Position { get; set; }

        public bool Booked { get; set; }
    }
}
