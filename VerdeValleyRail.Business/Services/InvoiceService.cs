using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VerdeValleyRail.Business.Resources;
using VerdeValleyRail.Data.Entities;

namespace VerdeValleyRail.Business.Services
{
    public interface IInvoiceService
    {
        Invoice CreateInvoice(IEnumerable<BookingCreate> bookingCreates);
        bool PayInvoice(Invoice invoice);
    }

    public class InvoiceService : IInvoiceService
    {
        Func<ITripService> _createTripService;
        IBookingService _bookService;

        public InvoiceService(Func<ITripService> createTripService, IBookingService bookService)
        {     
            _createTripService = createTripService;
            _bookService = bookService;
        }

        public Invoice CreateInvoice(IEnumerable<BookingCreate> bookingCreates)
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

            var invoice = new Invoice();
            invoice.Items = invoiceItems.ToList();

            var totalPrice = invoice.Items.Select(i => i.Price).Sum();

            invoice.Tax = .06m * totalPrice;
            invoice.TotalPrice = totalPrice;

            return invoice;
        }

        public bool PayInvoice(Invoice invoice)
        {
            foreach(var item in invoice.Items)
            {
                item.Booking.CustomerId = invoice.CustomerId;
                _bookService.CreateBooking(item.Booking);
            }

            return true;
        }
    }
}
