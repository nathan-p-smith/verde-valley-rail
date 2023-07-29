using System;
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

        public string Row { get; set; }

        public bool Booked { get; set; }
    }
}
