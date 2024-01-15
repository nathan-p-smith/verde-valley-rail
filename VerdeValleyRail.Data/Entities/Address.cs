using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities
{
    public partial class Address
    {
        public Address()
        {
            Stations = new HashSet<Station>();
        }

        public int AddressId { get; set; }
        public string Address1 { get; set; } = null!;
        public string? Address2 { get; set; }
        public string City { get; set; } = null!;
        public string State { get; set; } = null!;
        public string Zipcode { get; set; } = null!;
        public decimal Lat { get; set; }
        public decimal Lng { get; set; }

        public virtual ICollection<Station> Stations { get; set; }
    }
}
