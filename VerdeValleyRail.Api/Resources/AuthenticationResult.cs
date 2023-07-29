namespace VerdeValleyRail.Api.Resources
{
    public class AuthenticationResult
    {
        public bool Authenticated { get; set; }
        public string JwtToken { get; set; }
    }
}
