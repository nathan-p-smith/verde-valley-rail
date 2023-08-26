using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VerdeValleyRail.Business.Resources
{
    public class Invoice
    {
        public IEnumerable<InvoiceItem> Items { get; set; }
        public decimal Tax { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal GrandTotal { get { return Tax + TotalPrice; } }
        public int CustomerId { get; set; }
        //public PaymentMethod PaymentMethod { get; set; }
    }
}
