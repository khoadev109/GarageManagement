// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DefaultRegistry.cs" company="Web Advanced">
// Copyright 2012 Web Advanced (www.webadvanced.com)
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

namespace GarageManagement.Garage.WebAPI
{
    using System;
    using AutoMapper;
    using System.Linq;
    using StructureMap;
    using StructureMap.Web.Pipeline;
    using GarageManagement.Business.Garage;
    using GarageManagement.Garage.Entity.Context;
    using GarageManagement.RepositoryInterface;
    using GarageManagement.ServiceInterface.Garage;
    using GarageManagement.Infrastructure.Persistance;
    using GarageManagement.RepositoryInterface.Repositories;

    public class DefaultRegistry : Registry
    {
        public DefaultRegistry()
        {
            Scan(
                scan => {
                    scan.TheCallingAssembly();
                    scan.WithDefaultConventions();
                });

            For<IUnitOfWork<GarageDbContext>>().LifecycleIs(new HttpContextLifecycle()).Use<UnitOfWork<GarageDbContext>>();

            var profiles = from t in typeof(DefaultRegistry).Assembly.GetTypes()
                           where typeof(Profile).IsAssignableFrom(t)
                           select (Profile)Activator.CreateInstance(t);

            var config = new MapperConfiguration(cfg =>
            {
                foreach (var profile in profiles)
                    cfg.AddProfile(profile);
            });

            var mapper = config.CreateMapper();

            For<IConfigurationProvider>().Use(config);
            For<IMapper>().Use(mapper);

            RegisterRepositories();
            RegisterServices(mapper);
        }

        private void RegisterRepositories()
        {
            For(typeof(IAuditTrailLogRepository)).Use(typeof(AuditTrailLogRepository))
                .Ctor<GarageDbContext>("dbContext").Is(new GarageDbContext());
        }

        private void RegisterServices(IMapper mapper)
        {
            //For(typeof(IServiceBase<GarageDbContext>)).Use(typeof(ServiceBase<GarageDbContext>))
            //    .Ctor<IMapper>().Is(mapper);

            For<ICarBusinessService>().Use<CarBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<ICustomerBusinessService>().Use<CustomerBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<ICustomerExchangeBusinessService>().Use<CustomerExchangeBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<ICustomerTypeBusinessService>().Use<CustomerTypeBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<ICustomerExchangeBusinessService>().Use<CustomerExchangeBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<IBranchBusinessService>().Use<BranchBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<IServiceUnitBusinessService>().Use<ServiceUnitBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<IServiceTypeBusinessService>().Use<ServiceTypeBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<IServiceBusinessService>().Use<ServiceBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<IAccessaryBusinessService>().Use<AccessaryBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<IAccessaryUnitBusinessService>().Use<AccessaryUnitBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<ICategoryBusinessService>().Use<CategoryBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<IManufacturerBusinessService>().Use<ManufacturerBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<IStyleBusinessService>().Use<StyleBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<IModelBusinessService>().Use<ModelBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<IYearBusinessService>().Use<YearBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<IUserBusinessService>().Use<UserBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<IRefreshTokenBusinessService>().Use<RefreshTokenBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<IGarageBusinessService>().Use<GarageBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<IQuotationBusinessService>().Use<QuotationBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<IEmployeeBusinessService>().Use<EmployeeBusinessService>()
                .Ctor<IMapper>().Is(mapper);

            For<IRoleBusinessService>().Use<RoleBusinessService>().Ctor<IMapper>().Is(mapper);

            For<IModuleBusinessService>().Use<ModuleBusinessService>();

            For<IRoleRightModuleBusinessService>().Use<RoleRightModuleBusinessService>();

            For<IRightHandlerBusinessService>().Use<RightHandlerBusinessService>();

            For<IAuditTrailBusinessService>().Use<AuditTrailBusinessService>();
        }
    }
}
