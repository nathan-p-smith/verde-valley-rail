

using DataLoader;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using VerdeValleyRail.Data.Entities;

IConfiguration configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddUserSecrets<AppSettings>()    
    .Build();

var appSettings = configuration.Get<AppSettings>();

IConfigurationBuilder builder = new ConfigurationBuilder();


var s = builder.Build();

var serviceProvider = new ServiceCollection()
    .AddTransient<VerdeValleyRailContext>((c) => { return new VerdeValleyRailContext(appSettings.ConnectionStrings.VerdeValleyRail); });

var startDate = new DateTime(2024, 1, 28);
var endDate = new DateTime(2025, 1, 28);

int startHour = 8;

var dateIndex = new DateTime(startDate.Year, startDate.Month, startDate.Day, startHour, 0, 0);

while (dateIndex <= endDate)
{
    var db = new VerdeValleyRailContext(appSettings.ConnectionStrings.VerdeValleyRail);

    var routeIds = db.Routes.Select(t => t.RouteId).ToList();
    var trainIds = db.Trains.Select(t => t.TrainId).ToList();

    foreach(int routeId in routeIds)
    {
        var trip = new Trip()
        {
            RouteId = routeId,
            Departure = new DateTime(dateIndex.Year, dateIndex.Month, dateIndex.Day, dateIndex.Hour, dateIndex.Minute, 0),
            PricePerSeat = 15,
            TrainId = trainIds[new Random().Next(0, trainIds.Count)],
        };

        db.Trips.Add(trip);
        dateIndex = dateIndex.AddMinutes(15);
    }

    db.SaveChanges();

    dateIndex = new DateTime(dateIndex.Year, dateIndex.Month, dateIndex.Day, startHour, 0, 0);
    dateIndex = dateIndex.AddDays(1);

    Console.WriteLine(dateIndex.ToString());
}

Console.WriteLine("DONE!");