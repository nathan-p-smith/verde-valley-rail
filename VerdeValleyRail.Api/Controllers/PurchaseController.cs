using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VerdeValleyRail.Api.Resources;
using VerdeValleyRail.Business.Resources;
using VerdeValleyRail.Business.Services;

namespace VerdeValleyRail.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        IBookingService _bookingService;

        public PurchaseController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost]
        [Authorize]
        public ActionResult Post([FromBody] PurchaseCreate purchaseCreate)
        {
            int customerId = Int32.Parse(HttpContext.Items["customerId"]!.ToString()!);

            var bookings = new List<Booking>();

            foreach (var bookingCreate in purchaseCreate.Bookings)
            {
                bookingCreate.CustomerId = customerId; //Set CustomerId from JWT

                var booking = _bookingService.CreateBooking(bookingCreate);
                bookings.Add(booking);
            }

            return Ok(bookings);
        }

    }
}
