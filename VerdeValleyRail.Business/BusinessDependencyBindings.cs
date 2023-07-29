using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VerdeValleyRail.Business.Services;
using VerdeValleyRail.Data.Entities;
using VerdeValleyRail.Data.Queries;

namespace VerdeValleyRail.Business
{
    public static class BusinessDependencyBindings
    {
        public static IServiceCollection BindBusinessDependencies(this IServiceCollection services)
        {            
            //Services            
            services.AddTransient<IAuthenticationService, AuthenticationService>();
            services.AddTransient<ICustomerService, CustomerService>();
            services.AddTransient<ITripService, TripService>();

            return services;
        }
    }
}
