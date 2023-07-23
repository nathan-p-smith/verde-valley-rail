using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VerdeValleyRail.Data.Queries
{
    public interface IQuery
    {
        IEnumerable<TripSearchResult> SearchTrips();
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
