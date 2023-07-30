using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VerdeValleyRail.Business.Resources;
using VerdeValleyRail.Business.Services;

namespace VerdeValleyRail.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
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

        [HttpPost]
        public ActionResult CreateBooking([FromBody] BookingCreate bookingCreate)
        {
            var booking = _bookingService.CreateBooking(bookingCreate);

            return Ok(booking);
        }

    }
}
