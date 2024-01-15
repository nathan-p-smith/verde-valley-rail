using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities
{
    public partial class Invoice
    {
        public Invoice()
        {
            InvoiceBookings = new HashSet<InvoiceBooking>();
        }

        public int InvoiceId { get; set; }
        public int CustomerId { get; set; }
        public DateTime CreatedOn { get; set; }
        public Guid Guid { get; set; }

        public virtual Customer Customer { get; set; } = null!;
        public virtual ICollection<InvoiceBooking> InvoiceBookings { get; set; }
    }
}
