using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VerdeValleyRail.Business.Resources
{
    public class Route
    {
        public int RouteId { get; set; }

        public int Minutes { get; set; }

        public Station EndStation { get; set; } = null!;

        public Station StartStation { get; set; } = null!;
    }
}
