using DbExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VerdeValleyRail.Data.Queries
{
    public class VerdeDb : Database
    {
        public VerdeDb(string connectionString) : base(connectionString, "Microsoft.Data.SqlClient")
        {

        }
    }
}
