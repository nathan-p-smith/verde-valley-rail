using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VerdeValleyRail.Business.Resources;
using VerdeValleyRail.Business.Services;

namespace VerdeValleyRail.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : AuthorizedControllerBase
    {
        IBookingService _bookingService;

        public BookingsController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet("{guid}")]
        public ActionResult GetBooking(string guid)
        {
            var booking = _bookingService.GetBooking(guid);

            return Ok(booking);
        }

        [HttpGet("CustomerBookings")]
        public ActionResult GetCustomerBookings(DateTime minDate)
        {
            int? customerId = base.GetCustomerId();

            if (customerId == null)
                return BadRequest();

            var bookings = _bookingService.GetCustomerBookings((int)customerId, minDate.Date);

            return Ok(bookings);
        }

        [HttpPost]
        [Authorize]
        public ActionResult CreateBooking([FromBody] BookingCreate bookingCreate)
        {
            int customerId = Int32.Parse(HttpContext.Items["customerId"]!.ToString()!);

            bookingCreate.CustomerId = customerId; //Set CustomerId from JWT

            var booking = _bookingService.CreateBooking(bookingCreate);

            return Ok(booking);
        }
    }
}
