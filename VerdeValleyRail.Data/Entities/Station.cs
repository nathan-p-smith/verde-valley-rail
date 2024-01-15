using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities
{
    public partial class Station
    {
        public Station()
        {
            RouteEndStations = new HashSet<Route>();
            RouteStartStations = new HashSet<Route>();
        }

        public int StationId { get; set; }
        public string Name { get; set; } = null!;
        public int AddressId { get; set; }

        public virtual Address Address { get; set; } = null!;
        public virtual ICollection<Route> RouteEndStations { get; set; }
        public virtual ICollection<Route> RouteStartStations { get; set; }
    }
}
