using DbExtensions;
using System.Data.Common;
using VerdeValleyRail.Api;
using VerdeValleyRail.Api.Jwt;
using VerdeValleyRail.Business;
using VerdeValleyRail.Data;
using Microsoft.Extensions.Configuration.Json;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

IConfiguration configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddUserSecrets<AppSettings>()
    .Build();

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "wwwroot"; // Adjust this path based on your project structure
});

var appSettings = configuration.Get<AppSettings>();

builder.Services.BindDataDependencies(appSettings.ConnectionStrings.VerdeValleyRail)
    .BindBusinessDependencies()
    .AddSingleton<JwtMiddleware.Settings>(new JwtMiddleware.Settings()
    {
        JwtSecret = appSettings.JwtSecret
    });

var app = builder.Build();

// Needed for raw queries (DbExtensions)
DbProviderFactories.RegisterFactory("Microsoft.Data.SqlClient", Microsoft.Data.SqlClient.SqlClientFactory.Instance);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSpaStaticFiles();

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "wwwroot"; // Adjust this path based on your project structure
});

//app.UseHttpsRedirection();

app.UseMiddleware<JwtMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
