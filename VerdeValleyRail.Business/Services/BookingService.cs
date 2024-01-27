using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using R = VerdeValleyRail.Business.Resources;
using VerdeValleyRail.Data.Entities;
using E = VerdeValleyRail.Data.Entities;
using Omu.ValueInjecter;
using VerdeValleyRail.Data.Queries;
using VerdeValleyRail.Business.Resources;

namespace VerdeValleyRail.Business.Services
{
    public interface IBookingService
    {
        R.Booking GetBooking(string bookingGuid);
        IEnumerable<R.Booking> GetCustomerBookings(int customerId, DateTime minDate);
        R.Booking GetBooking(int bookingId);
        R.Booking CreateBooking(BookingCreate bookingCreate);
    }

    public class BookingService : IBookingService
    {
        VerdeValleyRailContext _db;
        ITripService _tripService;
        ICustomerService _customerService;
        IQuery _query;

        public BookingService(VerdeValleyRailContext db, 
            IQuery query, 
            ITripService tripService, 
            ICustomerService customerService)
        {
            _db = db;
            _query = query;
            _tripService = tripService;
            _customerService = customerService;

        }

        public R.Booking GetBooking(string bookingGuid)
        {
            int? bookingId = _db.Bookings.Where(b => b.BookingGuid == new Guid(bookingGuid)).FirstOrDefault()?.BookingId;

            if (bookingId == null)
                return null;

            return GetBooking((int)bookingId);
        }

        public IEnumerable<R.Booking> GetCustomerBookings(int customerId, DateTime minDate)
        {
            var bookingIds = _db.Bookings.Where(b => b.CustomerId == customerId)
                .Where(b => b.Trip.Departure >= minDate)
                .OrderBy(b => b.Trip.Departure)
                .Select(b => b.BookingId).ToList();

            var bookings = new List<R.Booking>();

            foreach(int bookingId in bookingIds)
            {
                bookings.Add(GetBooking(bookingId));
            }

            return bookings;
        }

        public R.Booking CreateBooking(BookingCreate bookingCreate)
        {
            var bookingEntity = new E.Booking();

            bookingEntity.InjectFrom(bookingCreate);
            bookingEntity.BookingGuid = Guid.NewGuid();

            _db.Bookings.Add(bookingEntity);

            foreach(var bookingSeat in bookingCreate.BookingSeats)
            {
                var bookingSeatEntity = new E.BookingSeat();

                bookingSeatEntity.InjectFrom(bookingSeat);
                bookingEntity.BookingSeats.Add(bookingSeatEntity);
            }

            _db.SaveChanges();

            return GetBooking(bookingEntity.BookingId);
        }

        public R.Booking GetBooking(int bookingId)
        {
            var bookingEntity = _db.Bookings.Find(bookingId);

            var booking = new R.Booking();
            booking.InjectFrom(bookingEntity);

            booking.Trip = _tripService.GetTrip(bookingEntity.TripId);

            booking.Customer = _customerService.GetCustomer(bookingEntity.CustomerId);

            booking.BookingSeats = _query.GetBookingSeats(bookingId).ToList().Select(s =>
            {

                var bookingSeat = new R.BookingSeat();
                bookingSeat.InjectFrom(s);

                return bookingSeat;

            }).ToList();            

            return booking;
        }
    }
}
