using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VerdeValleyRail.Data.Entities;

namespace VerdeValleyRail.Business.Resources
{
    public class Trip
    {
        public int TripId { get; set; }

        public DateTime Departure { get; set; }

        public decimal PricePerSeat { get; set; }

        public int TrainId { get; set; }

        public Route? Route { get; set; }

        public IEnumerable<TripSeat>? Seats { get; set; }
    }
}
