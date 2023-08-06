using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VerdeValleyRail.Data.Entities;

namespace VerdeValleyRail.Api.Controllers
{
    [Route("api/Stations")]
    [ApiController]
    public class StationOptionsController : ControllerBase
    {
        private VerdeValleyRailContext _db;

        public StationOptionsController(VerdeValleyRailContext db)
        {
            _db = db;
        }

        [HttpGet("Options")]
        public IActionResult GetAll()
        {
            var options = _db.Stations.Select(s => new { s.StationId, s.Name })
                            .OrderBy(s => s.Name).ToList();

            return Ok(options);
        }
    }
}
