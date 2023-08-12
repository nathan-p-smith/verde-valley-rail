using DbExtensions;
using System.Data.Common;
using VerdeValleyRail.Api;
using VerdeValleyRail.Api.Jwt;
using VerdeValleyRail.Business;
using VerdeValleyRail.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var appSettings = builder.Configuration.Get<AppSettings>();

builder.Services.BindDataDependencies(appSettings.ConnectionStrings.VerdeValleyRail)
    .BindBusinessDependencies()
    .AddSingleton<JwtMiddleware.Settings>(new JwtMiddleware.Settings()
    {
        JwtSecret = appSettings.JwtSecret
    });

var app = builder.Build();

// Needed for raw queries (DbExtensions)
DbProviderFactories.RegisterFactory("MySql.Data.MySqlClient", MySql.Data.MySqlClient.MySqlClientFactory.Instance);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseMiddleware<JwtMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
