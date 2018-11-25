using System;
using AutoMapper;
using System.Linq;
using System.Data.Entity;
using System.Collections.Generic;
using GarageManagement.ServiceInterface;
using GarageManagement.RepositoryInterface;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.ServiceInterface.Garage.DTO;

namespace GarageManagement.Business
{
    public class ServiceBase<TContext> : IServiceBase<TContext> where TContext : DbContext
    {
        protected IMapper mapper;
        public IUnitOfWork<TContext> unitOfWork;
        public TContext Context => unitOfWork.DbContext;

        public ServiceBase(IUnitOfWork<TContext> unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public ServiceBase(IUnitOfWork<TContext> unitOfWork, IMapper mapper) : this(unitOfWork)
        {
            this.mapper = mapper;
        }

        public void Dispose()
        {
            if (unitOfWork != null)
            {
                unitOfWork.Dispose();
            }

            GC.SuppressFinalize(this);
        }

        protected SearchQuery<T> GenerateDefaultSearchQuery<T>(int pageIndex, int pageSize) where T : class
        {
            return new SearchQuery<T>
            {
                CurrentPage = pageIndex,
                Skip = pageSize * (pageIndex - 1),
                Take = pageSize
            };
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
