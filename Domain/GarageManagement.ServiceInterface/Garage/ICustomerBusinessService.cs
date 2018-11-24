using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq.Expressions;
using System.Collections.Generic;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.Garage.Entity.Context;

namespace GarageManagement.ServiceInterface.Garage
{
    public interface ICustomerBusinessService : IServiceBase<GarageDbContext>
    {
        Task<DataResult<DTOCustomer>> GetCustomerByIdAsync(string customerId);

        Task<DataResult<IPagedListResult<DTOCustomer>>> GetCustomersWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                    CancellationToken cancellationToken = default(CancellationToken));

        Task<DataResult<IPagedListResult<DTOCustomerExchange>>> GetCustomersLookupWithPagingAsync(List<Expression<Func<CustomerExchange, bool>>> searchTerm,
                                                                                            string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                            CancellationToken cancellationToken = default(CancellationToken));

        Task<DataResult<DTOCustomer>> CreateAsync(DTOCustomer customerDTO, bool setGenerateId = false);

        Task<DataResult<DTOCustomer>> EditAsync(DTOCustomer customerDTO);

        Task<DataResult<bool>> DeleteAsync(string customerId);
    }
}
