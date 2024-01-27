using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VerdeValleyRail.Data.Entities;

namespace VerdeValleyRail.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarmupController : ControllerBase
    {
        VerdeValleyRailContext _db;

        public WarmupController(VerdeValleyRailContext db)
        {
            _db = db;
        }

        [HttpGet("DbReady")]
        public IActionResult DbReady()
        {
            try
            {
                //HACK: This is just to warm up the free azure db instance that becomes unavailable after inactivity.
                var trip = _db.Trips.First();

                return Ok(true);
            }
            catch (Exception ex)
            {
                return Ok(false);
            }
        }
    }
}
