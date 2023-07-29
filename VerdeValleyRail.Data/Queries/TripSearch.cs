using DbExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VerdeValleyRail.Data.Queries
{
    public partial class Query
    {
        public IEnumerable<TripSearchResult> SearchTrips(TripSearchFilter filter)
        {
            var query = SQL.SELECT(@"tp.TripId, 
                                    vts.TrainId, 
                                    tp.Departure, 
                                    ss.Name as StartingStationName, 
                                    es.Name as EndingStationName, 
                                    tp.PricePerSeat, 
                                    r.Minutes, 
                                    COUNT(*) as AvailableSeats")
                .FROM(@"Trip tp INNER JOIN Route r ON
                        tp.RouteId = r.RouteId INNER JOIN Station ss ON
                        r.StartStationId = ss.StationId INNER JOIN Station es ON
                        r.EndStationId = es.StationId INNER JOIN vw_TripSeat vts ON
                        tp.TripId = vts.TripId")
                .WHERE(@"vbs.SeatId IS NULL");

            if (filter?.StartStationId != null)
                query.WHERE("r.StartStationId = {0}", filter.StartStationId);

            if (filter?.EndStationId != null)
                query.WHERE("r.EndStationId = {0}", filter.EndStationId);

            query.GROUP_BY(@"tp.TripId, vts.TrainId, tp.Departure, ss.Name, es.Name, tp.PricePerSeat, r.Minutes")
                .ORDER_BY("tp.Departure");

            return _db.Map<TripSearchResult>(query);
        }
    }

    public class TripSearchFilter
    {
        public int? StartStationId { get; set; }
        public int? EndStationId { get; set; }
    }

    public class TripSearchResult
    {
        public int TripId { get; set; }
        public int TrainId { get; set; }
        public DateTime Departure { get; set; }
        public string StartingStationName { get; set; }
        public string EndingStationName { get; set; }
        public decimal PricePerSeat { get; set; }
        public int Minutes { get; set; }
        public int AvailableSeats { get; set; }
    }
}
