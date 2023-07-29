using DbExtensions;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VerdeValleyRail.Data.Queries
{
    public partial class Query
    {
        public IEnumerable<TripSeatResult> GetTripSeats(int tripId)
        {
            var query = SQL.SELECT(@"CarId, SeatId, `Row`, `Position`, IF(BookingSeatId IS NOT NULL, 1, 0) AS Booked")
                .FROM("vw_TripSeat vts")
                .WHERE("vts.TripId = {0}", tripId)
                .ORDER_BY("CarId, `Row`, Position");

            return _db.Map<TripSeatResult>(query);
        }
    }

    public class TripSeatResult
    {
        public int CarId { get; set; }
        public int SeatId { get; set; }
        public string Row { get; set; }
        public bool Booked { get; set; }
    }
}
