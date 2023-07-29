using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VerdeValleyRail.Business.Resources
{
    public partial class Station
    {
        public int StationId { get; set; }

        public string Name { get; set; } = null!;        

        public virtual Address Address { get; set; } = null!;        
    }
}
