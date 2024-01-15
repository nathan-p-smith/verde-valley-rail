using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities
{
    public partial class CarType
    {
        public CarType()
        {
            Cars = new HashSet<Car>();
            Seats = new HashSet<Seat>();
        }

        public int CarTypeId { get; set; }
        public string Description { get; set; } = null!;

        public virtual ICollection<Car> Cars { get; set; }
        public virtual ICollection<Seat> Seats { get; set; }
    }
}
