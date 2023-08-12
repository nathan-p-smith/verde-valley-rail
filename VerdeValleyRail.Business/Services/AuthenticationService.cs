using Omu.ValueInjecter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VerdeValleyRail.Data.Entities;
using E = VerdeValleyRail.Data.Entities;
using R = VerdeValleyRail.Business.Resources;

namespace VerdeValleyRail.Business.Services
{
    public interface IAuthenticationService
    {
        bool TryAuthenticate(string email, string password, out R.Customer customer);
    }

    public class AuthenticationService : IAuthenticationService
    {
        private VerdeValleyRailContext _db;

        public AuthenticationService(VerdeValleyRailContext db)
        {
            _db = db;
        }

        public bool TryAuthenticate(string email, string password, out R.Customer customer)
        {
            customer = null;

            var customerEntity = _db.Customers.Where(c => c.Email == email).FirstOrDefault();

            if (customerEntity == null)
                return false;

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(password, customerEntity.PasswordSalt);

            if (passwordHash != customerEntity.PasswordHash)
                return false;

            customer = new R.Customer();

            customer.InjectFrom(customerEntity);

            return true;
        }
    }
}
