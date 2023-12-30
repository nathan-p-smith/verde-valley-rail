using VerdeValleyRail.Business.Resources;

namespace VerdeValleyRail.Api.Resources
{
    public class PurchaseCreate
    {
        public string CreditCardNumber { get; set; }
        public DateTime CardExpirationDate { get; set; }
        public string CardCvc { get; set; }

        public List<BookingCreate> Bookings { get; set;}
    }

    
}
