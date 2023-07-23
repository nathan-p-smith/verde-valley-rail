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
        public IEnumerable<TripSearchResult> SearchTrips()
        {
            var query = SQL.SELECT("t.Departure, ss.Name as StartingStationName, es.Name as EndingStationName, t.PricePerSeat")
                .FROM(@"Trip t INNER JOIN Route r ON
                        t.RouteId = r.RouteId INNER JOIN Station ss ON
                        r.StartStationId = ss.StationId INNER JOIN Station es ON
                        r.EndStationId = es.StationId INNER JOIN Train tr ON
                        tr.TrainId = tr.TrainId")
                .ORDER_BY("t.Departure");

            return _db.Map<TripSearchResult>(query);
        }
    }

    public class TripSearchResult
    {
        public DateTime Departure { get; set; }
        public string StartingStationName { get; set; }
        public string EndingStationName { get; set; }
        public decimal PricePerSeat { get; set; }
    }
}
