using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VerdeValleyRail.Business.Resources
{
    public class BookingCreate
    {
        public int TripId { get; set; }

        public int CustomerId { get; set; }        

        public virtual IEnumerable<BookingSeatCreate> BookingSeats { get; set; }        
    }
}
