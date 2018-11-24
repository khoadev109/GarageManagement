using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Common.Core.AutoGenerate;
using System.Collections.Generic;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.ServiceInterface;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface;

using GarageManagement.RepositoryInterface.Paging;
using static Common.Core.Extension.AttributeExtensions;

namespace GarageManagement.Business.Garage
{
    public class BranchBusinessService : ServiceBase<GarageDbContext>, IBranchBusinessService
    {
        public IMapper _mapper;

        public BranchBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
        }

        public Task<DataResult<DTOBranch>> GetByIdAsync(string id)
        {
            return Task.Run(() => {
                var branchDTO = new DTOBranch();
                var branchRepository = _unitOfWork.GetRepository<Branch>();

                var branch = branchRepository.GetById(id);
                if (branch != null)
                {
                    branchDTO = _mapper.Map<DTOBranch>(branch);
                }
                else
                {
                    var identityNumber = branchRepository.Identity(x => x.GenerateId) != null ? branchRepository.Identity(x => x.GenerateId).GenerateId : 0;
                    branchDTO.Id = IdentityGenerate.Create(identityNumber, new string[] { "", EntityPrefix.Branch.ToDefaultValue() }, NumberUnitType.Tiny);
                }

                return new DataResult<DTOBranch> { Errors = new List<ErrorDescriber>(), Target = branchDTO };
            });
        }

        public Task<DataResult<List<DTOBranch>>> GetAllAsync()
        {
            return Task.Run(() => {
                var branches = _unitOfWork.GetRepository<Branch>().GetAll().ToList();
                branches.Add(new Branch { Id = "", Name = "Chọn chi nhánh", ShortName = "" });
                var branchesDTO = _mapper.Map<List<DTOBranch>>(branches);

                return new DataResult<List<DTOBranch>> { Errors = new List<ErrorDescriber>(), Target = branchesDTO };
            });
        }

        public Task<DataResult<IPagedListResult<DTOBranch>>> GetBranchesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize,
                                                                                       CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() => {
                var searchQuery = new SearchQuery<Branch>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;

                var sort = new FieldSortCriteria<Branch>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Name.Contains(searchTerm) || x.Address.Contains(searchTerm));

                var pagedBranches = _unitOfWork.GetRepository<Branch>().Search(searchQuery);
                
                return new DataResult<IPagedListResult<DTOBranch>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOBranch, Branch>(_mapper, pagedBranches)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOBranch>> CreateBranchAsync(DTOBranch branchDTO)
        {
            return Task.Run(() => {
                var createdBranchDTO = new DTOBranch();
                var branchRepository = _unitOfWork.GetRepository<Branch>();

                var branchEntity = _mapper.Map<Branch>(branchDTO);

                if (!branchRepository.ExistByCondition(x => x.Name == branchEntity.Name))
                {
                    var createdBranchEntity = branchRepository.Insert(branchEntity);
                    _unitOfWork.SaveChanges();

                    createdBranchDTO = _mapper.Map<DTOBranch>(createdBranchEntity);
                }

                return new DataResult<DTOBranch> { Errors = new List<ErrorDescriber>(), Target = createdBranchDTO };
            });
        }

        public Task<DataResult<DTOBranch>> EditBranchAsync(DTOBranch branchDTO)
        {
            return Task.Run(() => {
                var branchRepository = _unitOfWork.GetRepository<Branch>();

                var branchEntity = _mapper.Map<Branch>(branchDTO);
                var updatedBranchDTO = new DTOBranch();
                if ((branchRepository.ExistByCondition(x => (x.Name == branchEntity.Name && x.Id == branchEntity.Id))) || (!branchRepository.ExistByCondition(x => x.Name == branchEntity.Name)))
                {
                    var updatedBranchEntity = branchRepository.Update(branchEntity);
                    _unitOfWork.SaveChanges();

                    updatedBranchDTO = _mapper.Map<DTOBranch>(updatedBranchEntity);

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
                _unitOfWork.GetRepository<Branch>().Delete(id);
                _unitOfWork.SaveChanges();

                return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
            });
        }
    }
}
