using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VerdeValleyRail.Business.Resources;
using VerdeValleyRail.Data.Entities;
using E = VerdeValleyRail.Data.Entities;
using R = VerdeValleyRail.Business.Resources;

namespace VerdeValleyRail.Business.Services
{
    public interface IInvoiceService
    {
        R.Invoice CreateInvoice(IEnumerable<BookingCreate> bookingCreates);
        bool PayInvoice(R.Invoice invoice);
    }

    public class InvoiceService : IInvoiceService
    {
        Func<ITripService> _createTripService;
        IBookingService _bookService;
        VerdeValleyRailContext _db;

        public InvoiceService(Func<ITripService> createTripService, IBookingService bookService, VerdeValleyRailContext db)
        {     
            _createTripService = createTripService;
            _bookService = bookService;
            _db = db;
        }

        public R.Invoice CreateInvoice(IEnumerable<BookingCreate> bookingCreates)
        {
            var invoiceItems = new ConcurrentBag<InvoiceItem>();

            Parallel.ForEach(bookingCreates, parallelOptions: new ParallelOptions() { MaxDegreeOfParallelism = 20 }, (bookingCreate) =>
            {

                var invoiceItem = new InvoiceItem();

                var tripService = _createTripService();

                var trip = tripService.GetTrip(bookingCreate.TripId, withSeats: false);

                invoiceItem.Trip = trip;
                invoiceItem.Price = trip.PricePerSeat * bookingCreate.BookingSeats.Count();
                invoiceItem.Booking = bookingCreate;

                invoiceItems.Add(invoiceItem);
            });

            var invoice = new R.Invoice();
            invoice.Items = invoiceItems.ToList();

            var totalPrice = invoice.Items.Select(i => i.Price).Sum();

            invoice.Tax = .06m * totalPrice;
            invoice.TotalPrice = totalPrice;

            return invoice;
        }

        public bool PayInvoice(R.Invoice invoice)
        {
            var invoiceEntity = new E.Invoice();

            invoiceEntity.CustomerId = invoice.CustomerId;
            invoiceEntity.CreatedOn = DateTime.Now.ToUniversalTime();
            invoiceEntity.Guid = Guid.NewGuid().ToString();

            invoiceEntity.InvoiceBookings = new List<InvoiceBooking>();

            foreach(var item in invoice.Items)
            {
                item.Booking.CustomerId = invoice.CustomerId;
                var booking = _bookService.CreateBooking(item.Booking);

                var invoiceBooking = new InvoiceBooking()
                {
                    InvoiceId = invoiceEntity.InvoiceId,
                    BookingId = booking.BookingId
                };

                invoiceEntity.InvoiceBookings.Add(invoiceBooking);
            }

            _db.Add(invoiceEntity);
            _db.SaveChanges();

            return true;
        }
    }
}
