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
        R.Customer GetCustomer(int customerId);
        R.Customer CreateCustomer(CustomerCreate customerCreate);
        bool EmailExists(string email);
    }

    public class CustomerService : ICustomerService
    {
        VerdeValleyRailContext _db;

        public CustomerService(VerdeValleyRailContext db)
        {
            _db = db;
        }

        public R.Customer GetCustomer(int customerId)
        {
            var customerEntity = _db.Customers.Find(customerId);

            var customer = new R.Customer();

            customer.InjectFrom(customerEntity);

            return customer;
        }

        public R.Customer CreateCustomer(CustomerCreate customerCreate)
        {
            var customerEntity = new E.Customer();

            if(EmailExists(customerCreate.Email))            
                throw new Exception($"Email {customerCreate.Email} is already in use.");
            
            customerEntity.InjectFrom(customerCreate);

            customerEntity.PasswordSalt = BCrypt.Net.BCrypt.GenerateSalt();
            customerEntity.PasswordHash = BCrypt.Net.BCrypt.HashPassword(customerCreate.Password, customerEntity.PasswordSalt);

            _db.Add(customerEntity);
            _db.SaveChanges();

            var customer = new R.Customer();
            customer.InjectFrom(customerEntity);

            return customer;
        }

        public bool EmailExists(string email)
        {
            return _db.Customers.Where(c => c.Email == email).Any();
        }
    }
}
