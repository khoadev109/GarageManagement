using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Common.Core.AutoGenerate;
using System.Collections.Generic;
using Common.Core.WebAPI.Result;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.ServiceInterface;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface;
using GarageManagement.RepositoryInterface.Paging;
using static Common.Core.Extension.AttributeExtensions;

namespace GarageManagement.Business.Garage
{
    public class BranchBusinessService : ServiceBase<GarageDbContext>, IBranchBusinessService
    {
        private readonly IRepository<Branch> _branchRepository;

        public BranchBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            _branchRepository = base.unitOfWork.GetRepository<Branch>();
        }

        public Task<DataResult<DTOBranch>> GetByIdAsync(string id)
        {
            return Task.Run(() => {
                var branchDTO = new DTOBranch();
                
                var branch = _branchRepository.GetById(id);
                if (branch != null)
                {
                    branchDTO = mapper.Map<DTOBranch>(branch);
                }
                else
                {
                    var identityNumber = _branchRepository.Identity(x => x.GenerateId) != null ? _branchRepository.Identity(x => x.GenerateId).GenerateId : 0;
                    branchDTO.Id = IdentityGenerate.Create(identityNumber, new string[] { "", EntityPrefix.Branch.ToDefaultValue() }, NumberUnitType.Tiny);
                }

                return new DataResult<DTOBranch> { Errors = new List<ErrorDescriber>(), Target = branchDTO };
            });
        }

        public Task<DataResult<List<DTOBranch>>> GetAllAsync()
        {
            return Task.Run(() => {
                var branches = _branchRepository.GetAll().ToList();
                branches.Add(new Branch { Id = "", Name = "Chọn chi nhánh", ShortName = "" });
                var branchesDTO = mapper.Map<List<DTOBranch>>(branches);

                return new DataResult<List<DTOBranch>> { Errors = new List<ErrorDescriber>(), Target = branchesDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOBranch>>> GetBranchesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                       CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() => {
                var searchQuery = new SearchQuery<Branch>
                {
                    CurrentPage = pageIndex,
                    Skip = pageSize * (pageIndex - 1),
                    Take = pageSize
                };
                
                var sort = new FieldSortCriteria<Branch>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Name.Contains(searchTerm) || x.Address.Contains(searchTerm));

                var pagedBranches = _branchRepository.Search(searchQuery);
                
                return new DataResult<IPagedListResult<DTOBranch>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOBranch, Branch>(mapper, pagedBranches)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOBranch>> CreateBranchAsync(DTOBranch branchDTO)
        {
            return Task.Run(() => {
                var createdBranchDTO = new DTOBranch();
                var branchEntity = mapper.Map<Branch>(branchDTO);

                if (!_branchRepository.ExistByCondition(x => x.Name == branchEntity.Name))
                {
                    var createdBranchEntity = _branchRepository.Insert(branchEntity);
                    unitOfWork.SaveChanges();

                    createdBranchDTO = mapper.Map<DTOBranch>(createdBranchEntity);
                }

                return new DataResult<DTOBranch> { Errors = new List<ErrorDescriber>(), Target = createdBranchDTO };
            });
        }

        public Task<DataResult<DTOBranch>> EditBranchAsync(DTOBranch branchDTO)
        {
            return Task.Run(() => {
                var branchEntity = mapper.Map<Branch>(branchDTO);
                var updatedBranchDTO = new DTOBranch();
                if ((_branchRepository.ExistByCondition(x => (x.Name == branchEntity.Name && x.Id == branchEntity.Id))) || (!_branchRepository.ExistByCondition(x => x.Name == branchEntity.Name)))
                {
                    var updatedBranchEntity = _branchRepository.Update(branchEntity);
                    unitOfWork.SaveChanges();

                    updatedBranchDTO = mapper.Map<DTOBranch>(updatedBranchEntity);

                    return new DataResult<DTOBranch> { Errors = new List<ErrorDescriber>(), Target = updatedBranchDTO };
                }
                else
                {
                    return new DataResult<DTOBranch> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Branch Name") }, Target = updatedBranchDTO };
                }
            });
        }

        public Task<DataResult<bool>> DeleteBranchAsync(string id)
        {
            return Task.Run(() => {
                _branchRepository.Delete(id);
                unitOfWork.SaveChanges();

                return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
            });
        }
    }
}
