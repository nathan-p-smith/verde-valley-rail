using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VerdeValleyRail.Business.Services;

namespace VerdeValleyRail.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        private ITripService _tripService;

        public TripsController(ITripService tripService)
        {
            _tripService = tripService;
        }

        [HttpGet("{id}")]
        public ActionResult GetTrip(int id, bool includeSeats = true)
        {
            var trip = _tripService.GetTrip(id, withSeats: includeSeats);

            return Ok(trip);
        }
    }
}
