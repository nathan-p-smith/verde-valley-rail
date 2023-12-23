using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VerdeValleyRail.Api.Jwt;
using VerdeValleyRail.Api.Resources;
using VerdeValleyRail.Business.Resources;
using VerdeValleyRail.Business.Services;

namespace VerdeValleyRail.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        IAuthenticationService _authenticationService;
        JwtMiddleware.Settings _jwtSettings;

        public AuthenticationController(IAuthenticationService authenticationService, JwtMiddleware.Settings jwtSettings)
        {
            _authenticationService = authenticationService;
            _jwtSettings = jwtSettings;

        }

        [HttpPost]
        public IActionResult Post([FromBody] AuthenticateRequest request)
        {            
            if(_authenticationService.TryAuthenticate(request.Email, request.Password, out Customer customer))
            {
                string jwt = JwtHelper.CreateToken(customer.CustomerId, _jwtSettings.JwtSecret);

                return Ok(jwt);
            }

            return Unauthorized();
        }
    }
}
