using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VerdeValleyRail.Business.Resources
{
    public class InvoiceItem
    {
        public Trip Trip { get; set; }
        public BookingCreate Booking { get; set; }        
        public decimal Price { get; set; }
    }
}
