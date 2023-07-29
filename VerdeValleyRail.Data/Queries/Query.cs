using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VerdeValleyRail.Data.Queries
{
    public interface IQuery
    {
        IEnumerable<BookingSeatResult> GetBookingSeats(int bookingId);
        IEnumerable<TripSeatResult> GetTripSeats(int tripId);
        IEnumerable<TripSearchResult> SearchTrips(TripSearchFilter filter);
    }

    public partial class Query : IQuery, IDisposable
    {
        private VerdeDb _db;

        public Query(VerdeDb db)
        {
            _db = db;
        }

        public void Dispose() 
        {
            _db.Dispose();
        }   
    }
}
