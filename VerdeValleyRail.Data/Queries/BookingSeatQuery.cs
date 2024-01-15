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
        public IEnumerable<BookingSeatResult> GetBookingSeats(int bookingId)
        {
            var query = SQL.SELECT("TripId, BookingId, BookingSeatId, SeatId, CarId, [Row], [Position]")
                .FROM("vw_BookingSeat")
                .WHERE("BookingId = {0}", bookingId);

            return _db.Map<BookingSeatResult>(query);
        }
    }

    public class BookingSeatResult
    {
        public int BookingSeatId { get; set; }
        public int SeatId { get; set; }
        public int CarId { get; set; }
        public int Row { get; set; }
        public string Position { get; set; }
    }
}
