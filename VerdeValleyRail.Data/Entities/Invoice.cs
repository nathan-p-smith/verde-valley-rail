using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities;

public partial class Invoice
{
    public int InvoiceId { get; set; }

    public int CustomerId { get; set; }

    public DateTime CreatedOn { get; set; }

    public string Guid { get; set; } = null!;

    public virtual ICollection<InvoiceBooking> InvoiceBookings { get; set; } = new List<InvoiceBooking>();
}
