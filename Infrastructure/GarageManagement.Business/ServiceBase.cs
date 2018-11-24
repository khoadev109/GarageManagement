using System;
using AutoMapper;
using System.Linq;
using System.Data.Entity;
using System.Collections.Generic;
using GarageManagement.RepositoryInterface;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.ServiceInterface;
using GarageManagement.ServiceInterface.Garage.DTO;

namespace GarageManagement.Business
{
    public class ServiceBase<TContext> : IServiceBase<TContext> where TContext : DbContext
    {
        public IUnitOfWork<TContext> _unitOfWork { get; set; }

        public DbContext _context { get { return _unitOfWork.DbContext; } }

        public ServiceBase(IUnitOfWork<TContext> unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public void Dispose()
        {
            if (_unitOfWork != null)
                _unitOfWork.Dispose();

            GC.SuppressFinalize(this);
        }

        protected IPagedListResult<T> GetDefaultPagingDtoResult<T, K>(IMapper mapper, IPagedListResult<K> pagingEntitiesResult)
            where T : DTOBase
            where K : class
        {
            var pagingDtosResult = new PagedListResult<T>
            {
                CurrentPage = pagingEntitiesResult.CurrentPage,
                TotalRows = pagingEntitiesResult.TotalRows,
                TotalPages = pagingEntitiesResult.TotalPages,
                HasNext = pagingEntitiesResult.HasNext,
                HasPrevious = pagingEntitiesResult.HasPrevious,
                DTOs = mapper.Map<List<T>>(pagingEntitiesResult.DTOs.ToList())
            };
            return pagingDtosResult;
        }
    }
}
