using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities
{
    public partial class Route
    {
        public int RouteId { get; set; }
        public int StartStationId { get; set; }
        public int EndStationId { get; set; }
        public int Minutes { get; set; }

        public virtual Station EndStation { get; set; } = null!;
        public virtual Station StartStation { get; set; } = null!;
    }
}
