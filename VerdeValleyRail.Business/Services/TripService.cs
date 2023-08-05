using Omu.ValueInjecter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VerdeValleyRail.Data.Entities;
using VerdeValleyRail.Data.Queries;
using E = VerdeValleyRail.Data.Entities;
using R = VerdeValleyRail.Business.Resources;

namespace VerdeValleyRail.Business.Services
{
    public interface ITripService
    {
        R.Trip GetTrip(int tripId, bool withSeats = false);
    }

    public class TripService : ITripService
    {
        private VerdeValleyRailContext _db;
        private IQuery _query;

        public TripService(VerdeValleyRailContext db, IQuery query)
        {
            _db = db;
            _query = query;
        }

        public R.Trip GetTrip(int tripId, bool withSeats = false)
        {
            var tripEntity = _db.Trips.Find(tripId);

            var trip = new R.Trip();
            trip.InjectFrom(tripEntity);

            var routeEntity = _db.Routes.Find(tripEntity.RouteId);

            var route = new R.Route();
            route.InjectFrom(routeEntity);

            route.StartStation = GetStation(routeEntity.StartStationId);
            route.EndStation = GetStation(routeEntity.EndStationId);

            trip.Route = route;

            if(withSeats)
                trip.Seats = _query.GetTripSeats(tripId).ToList().Select((s) =>
                {
                    var tripSeat = new R.TripSeat();
                    tripSeat.InjectFrom(s);
                    return tripSeat;
                });

            return trip;
        }

        private R.Station GetStation(int stationId)
        {
            var stationEntity = _db.Stations.Find(stationId);
            var station = new R.Station();

            station.InjectFrom(stationEntity);

            var addressEntity = _db.Addresses.Find(stationEntity.AddressId);
            station.Address = new R.Address();
            station.Address.InjectFrom(addressEntity);

            return station;
        }
    }
}
