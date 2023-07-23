using Microsoft.Extensions.DependencyInjection;
using VerdeValleyRail.Data.Queries;

namespace VerdeValleyRail.Data
{
    public static class DataDependencyBindings
    {
        public static IServiceCollection BindDataDependencies(this IServiceCollection services, string connectionString)
        {
            //Entities
            
            //Queries            
            services.AddTransient<VerdeDb>((c) => { return new VerdeDb(connectionString); });
            services.AddTransient<IQuery, Query>();

            return services;
        }
    }
}
