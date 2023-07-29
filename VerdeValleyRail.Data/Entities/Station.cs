using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities;

public partial class Station
{
    public int StationId { get; set; }

    public string Name { get; set; } = null!;

    public int AddressId { get; set; }

    public virtual Address Address { get; set; } = null!;

    public virtual ICollection<Route> RouteEndStations { get; set; } = new List<Route>();

    public virtual ICollection<Route> RouteStartStations { get; set; } = new List<Route>();
}
