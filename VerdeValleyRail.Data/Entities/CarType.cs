using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities;

public partial class CarType
{
    public int CarTypeId { get; set; }

    public string Description { get; set; } = null!;

    public virtual ICollection<Car> Cars { get; set; } = new List<Car>();

    public virtual ICollection<Seat> Seats { get; set; } = new List<Seat>();
}
