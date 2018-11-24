using System;
using AutoMapper;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using Common.Core.Extension;
using Common.Core.AutoGenerate;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.RepositoryInterface;
using GarageManagement.RepositoryInterface.Paging;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface;

namespace GarageManagement.Business.Garage
{
    public class EmployeeBusinessService : ServiceBase<GarageDbContext>, IEmployeeBusinessService
    {
        public IMapper _mapper;

        private readonly IRepository<Employee> employeeRepository;
        private readonly IRepository<User> userRepository;

        public EmployeeBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
            employeeRepository = _unitOfWork.GetRepository<Employee>();
            userRepository = _unitOfWork.GetRepository<User>();
        }

        public Task<DataResult<DTOEmployee>> GetEmployeeByIdAsync(string employeeId)
        {
            return Task.Run(() =>
            {
                var employeeDTO = new DTOEmployee();

                var employee = employeeRepository.GetById(employeeId);
                if (employee != null)
                {
                    employeeDTO = _mapper.Map<DTOEmployee>(employee);
                }
                else
                {
                    var identityNumber = employeeRepository.Identity(x => x.GenerateId) != null ? employeeRepository.Identity(x => x.GenerateId).GenerateId : 0;
                    employeeDTO.Id = IdentityGenerate.Create(identityNumber, new string[] { "", EntityPrefix.Employee.ToDefaultValue() }, NumberUnitType.Large);
                }

                return new DataResult<DTOEmployee> { Errors = new List<ErrorDescriber>(), Target = employeeDTO };
            });
        }

        public Task<DataResult<List<DTOEmployee>>> GetAllEmployeesAsync()
        {
            return Task.Run(() =>
            {
                var employeeDTOs = new List<DTOEmployee>();

                var employees = employeeRepository.GetAll().ToList();
                if (employees != null && employees.Count > 0)
                    employeeDTOs = _mapper.Map<List<DTOEmployee>>(employees);

                return new DataResult<List<DTOEmployee>> { Errors = new List<ErrorDescriber>(), Target = employeeDTOs };
            });
        }

        public Task<DataResult<IPagedListResult<DTOEmployee>>> GetEmployeesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var searchQuery = new SearchQuery<Employee>();

                searchQuery.CurrentPage = pageIndex;
                searchQuery.Skip = pageSize * (pageIndex - 1);
                searchQuery.Take = pageSize;
                searchQuery.IncludeProperties = "Branch";

                var sort = new FieldSortCriteria<Employee>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Name.Contains(searchTerm) || x.Phone.Contains(searchTerm));

                var pagedEmployees = employeeRepository.Search(searchQuery);

                return new DataResult<IPagedListResult<DTOEmployee>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOEmployee, Employee>(_mapper, pagedEmployees)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOEmployee>> CreateEmployeeAsync(DTOEmployee employeeDTO)
        {
            return Task.Run(() =>
            {
                var createdEmployeeDTO = new DTOEmployee();
                var employeeEntity = _mapper.Map<Employee>(employeeDTO);

                if (!employeeRepository.ExistByCondition(x => x.Name == employeeEntity.Name ||
                                                        (!string.IsNullOrEmpty(x.Email) && x.Email == employeeEntity.Email)))
                {
                    var createdEmployeeEntity = employeeRepository.Insert(employeeEntity);
                    _unitOfWork.SaveChanges();

                    createdEmployeeDTO = _mapper.Map<DTOEmployee>(createdEmployeeEntity);
                }

                return new DataResult<DTOEmployee> { Errors = new List<ErrorDescriber>(), Target = createdEmployeeDTO };
            });
        }

        public Task<DataResult<DTOEmployee>> EditEmployeeAsync(DTOEmployee employeeDTO)
        {
            return Task.Run(() =>
            {
                var employeeEntity = _mapper.Map<Employee>(employeeDTO);
                var updatedEmployeeDTO = new DTOEmployee();
                if ((employeeRepository.ExistByCondition(x => (x.Name == employeeEntity.Name && x.Id == employeeEntity.Id))) || (!employeeRepository.ExistByCondition(x => x.Name == employeeEntity.Name)))
                {
                    var updatedEmployeeEntity = employeeRepository.Update(employeeEntity);
                    _unitOfWork.SaveChanges();

                    updatedEmployeeDTO = _mapper.Map<DTOEmployee>(updatedEmployeeEntity);

                    return new DataResult<DTOEmployee> { Errors = new List<ErrorDescriber>(), Target = updatedEmployeeDTO };
                }
                else
                {
                    return new DataResult<DTOEmployee> { Errors = new List<ErrorDescriber> { new ErrorDescriber("Existed Employee Name") }, Target = updatedEmployeeDTO };
                }
            });
        }

        public Task<DataResult<bool>> DeleteEmployeeAsync(string employeeId)
        {
            return Task.Run(() =>
            {
                if (!userRepository.ExistByCondition(x => x.EmployeeId == employeeId))
                {
                    employeeRepository.Delete(employeeId);
                    _unitOfWork.SaveChanges();

                    return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = true };
                }
                else
                {
                    var dependentErrorMessage = ConfigExtensions.GetAppSettingValueByString("dependentErrorMessage");
                    dependentErrorMessage = dependentErrorMessage.Replace("%ItemType%", "nhân viên");

                    return new DataResult<bool>
                    {
                        Errors = new List<ErrorDescriber> {
                        new ErrorDescriber(dependentErrorMessage) },
                        Target = false
                    };
                }
            });
        }
    }
}
