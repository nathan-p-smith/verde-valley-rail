namespace VerdeValleyRail.Api
{
    public class AppSettings
    {
        public Logging Logging { get; set; }
        public string JwtSecret { get; set; }
        public Connectionstrings ConnectionStrings { get; set; }
        public string AllowedHosts { get; set; }
    }

    public class Logging
    {
        public Loglevel LogLevel { get; set; }
    }

    public class Loglevel
    {
        public string Default { get; set; }
        public string MicrosoftAspNetCore { get; set; }
    }

    public class Connectionstrings
    {
        public string VerdeValleyRail { get; set; }
    }
}
