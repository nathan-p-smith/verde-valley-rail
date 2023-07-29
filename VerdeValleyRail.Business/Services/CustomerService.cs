using Omu.ValueInjecter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using R = VerdeValleyRail.Business.Resources;
using VerdeValleyRail.Business.Resources;
using VerdeValleyRail.Data.Entities;
using E = VerdeValleyRail.Data.Entities;

namespace VerdeValleyRail.Business.Services
{
    public interface ICustomerService
    {
        R.Customer CreateCustomer(CustomerCreate customerCreate);
    }

    public class CustomerService : ICustomerService
    {
        VerdeValleyRailContext _db;

        public CustomerService(VerdeValleyRailContext db)
        {
            _db = db;
        }

        public R.Customer CreateCustomer(CustomerCreate customerCreate)
        {
            var customerEntity = new E.Customer();

            customerEntity.InjectFrom(customerCreate);

            customerEntity.PasswordSalt = BCrypt.Net.BCrypt.GenerateSalt();
            customerEntity.PasswordHash = BCrypt.Net.BCrypt.HashPassword(customerCreate.Password, customerEntity.PasswordSalt);

            _db.Add(customerEntity);
            _db.SaveChanges();

            var customer = new R.Customer();
            customer.InjectFrom(customerEntity);

            return customer;
        }
    }
}
