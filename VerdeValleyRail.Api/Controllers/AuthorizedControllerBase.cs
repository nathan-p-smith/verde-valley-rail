using Microsoft.AspNetCore.Mvc;

namespace VerdeValleyRail.Api.Controllers
{
    public class AuthorizedControllerBase : ControllerBase
    {
        public AuthorizedControllerBase()
        {
            
        }

        protected int? GetCustomerId()
        {
            if (Int32.TryParse(HttpContext.Items["customerId"]!.ToString()!, out int customerId))
                return customerId;

            return null;
        }
    }
}
