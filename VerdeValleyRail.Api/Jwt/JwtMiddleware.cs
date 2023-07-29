namespace VerdeValleyRail.Api.Jwt
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly Settings _settings;

        public JwtMiddleware(RequestDelegate next, Settings settings)
        {
            _next = next;
            _settings = settings;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            int? customerId = null;

            JankyCoinJwtHelper.TryValidateToken(token, _settings.JwtSecret, out customerId);

            context.Items["customerId"] = customerId;

            await _next(context);
        }

        public class Settings
        {
            public string JwtSecret { get; set; }
        }
    }
}
