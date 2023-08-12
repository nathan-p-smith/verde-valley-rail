using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VerdeValleyRail.Api.Jwt;
using VerdeValleyRail.Business.Helpers;
using VerdeValleyRail.Business.Resources;
using VerdeValleyRail.Business.Services;

namespace VerdeValleyRail.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        ICustomerService _customerService;
        JwtMiddleware.Settings _settings;

        public CustomersController(ICustomerService customerService, JwtMiddleware.Settings settings)
        {
            _customerService = customerService;
            _settings = settings;
        }

        [HttpPost]
        public IActionResult CreateCustomer([FromBody] CustomerCreate customerCreate)
        {
            customerCreate.Phone = customerCreate.Phone.StripNonNumeric();

            var customer = _customerService.CreateCustomer(customerCreate);

            string jwt = JwtHelper.CreateToken(customer.CustomerId, _settings.JwtSecret);

            return Ok(new { jwt });
        }

        [HttpGet("EmailExists")]
        public IActionResult EmailExists(string email)
        {
            var emailExists = _customerService.EmailExists(email);

            return Ok(emailExists);
        }
    }
}
