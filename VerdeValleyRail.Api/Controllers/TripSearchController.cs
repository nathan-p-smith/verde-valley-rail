using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VerdeValleyRail.Data.Queries;

namespace VerdeValleyRail.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripSearchController : ControllerBase
    {
        private IQuery _query;

        public TripSearchController(IQuery query)
        {
            _query = query;
        }

        [HttpGet("~/api/Trips/Search")]
        public IActionResult Get()
        {
            var results = _query.SearchTrips().ToList();

            return Ok(results);
        }
    }
}
