using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VerdeValleyRail.Business.Resources
{
    public class PaymentMethod
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Address BillingAddress { get; set; }
        public string CardNumber { get; set; }
        public string SecurityCode { get; set; }
        public DateTime ExpDate { get; set; }
    }
}
