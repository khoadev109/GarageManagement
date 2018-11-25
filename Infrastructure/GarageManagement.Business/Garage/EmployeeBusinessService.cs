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
using Common.Core.WebAPI.Result;
using GarageManagement.ServiceInterface;

namespace GarageManagement.Business.Garage
{
    public class EmployeeBusinessService : ServiceBase<GarageDbContext>, IEmployeeBusinessService
    {
        private readonly IRepository<Employee> _employeeRepository;
        private readonly IRepository<User> _userRepository;

        public EmployeeBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            _employeeRepository = base.unitOfWork.GetRepository<Employee>();
            _userRepository = base.unitOfWork.GetRepository<User>();
        }

        public Task<DataResult<DTOEmployee>> GetEmployeeByIdAsync(string employeeId)
        {
            return Task.Run(() =>
            {
                var employeeDTO = new DTOEmployee();

                var employee = _employeeRepository.GetById(employeeId);
                if (employee != null)
                {
                    employeeDTO = mapper.Map<DTOEmployee>(employee);
                }
                else
                {
                    var identityNumber = _employeeRepository.Identity(x => x.GenerateId) != null ? _employeeRepository.Identity(x => x.GenerateId).GenerateId : 0;
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

                var employees = _employeeRepository.GetAll().ToList();
                if (employees != null && employees.Count > 0)
                    employeeDTOs = mapper.Map<List<DTOEmployee>>(employees);

                return new DataResult<List<DTOEmployee>> { Errors = new List<ErrorDescriber>(), Target = employeeDTOs };
            });
        }

        public Task<DataResult<IPagedListResult<DTOEmployee>>> GetEmployeesWithPagingAsync(string searchTerm, string sortName, string sortDirection, int pageIndex, int pageSize, CancellationToken cancellationToken = default(CancellationToken))
        {
            return Task.Run(() =>
            {
                var searchQuery = GenerateDefaultSearchQuery<Employee>(pageIndex, pageSize);

                searchQuery.IncludeProperties = "Branch";

                var sort = new FieldSortCriteria<Employee>(sortName, (SortDirection)Enum.Parse(typeof(SortDirection), sortDirection));
                searchQuery.AddSortCriteria(sort);

                if (!string.IsNullOrEmpty(searchTerm))
                    searchQuery.AddFilter(x => x.Name.Contains(searchTerm) || x.Phone.Contains(searchTerm));

                var pagedEmployees = _employeeRepository.Search(searchQuery);

                return new DataResult<IPagedListResult<DTOEmployee>>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = GetDefaultPagingDtoResult<DTOEmployee, Employee>(mapper, pagedEmployees)
                };

            }, cancellationToken);
        }

        public Task<DataResult<DTOEmployee>> CreateEmployeeAsync(DTOEmployee employeeDTO)
        {
            return Task.Run(() =>
            {
                var createdEmployeeDTO = new DTOEmployee();
                var employeeEntity = mapper.Map<Employee>(employeeDTO);

                if (!_employeeRepository.ExistByCondition(x => x.Name == employeeEntity.Name ||
                                                        (!string.IsNullOrEmpty(x.Email) && x.Email == employeeEntity.Email)))
                {
                    var createdEmployeeEntity = _employeeRepository.Insert(employeeEntity);
                    unitOfWork.SaveChanges();

                    createdEmployeeDTO = mapper.Map<DTOEmployee>(createdEmployeeEntity);
                }

                return new DataResult<DTOEmployee> { Errors = new List<ErrorDescriber>(), Target = createdEmployeeDTO };
            });
        }

        public Task<DataResult<DTOEmployee>> EditEmployeeAsync(DTOEmployee employeeDTO)
        {
            return Task.Run(() =>
            {
                var employeeEntity = mapper.Map<Employee>(employeeDTO);
                var updatedEmployeeDTO = new DTOEmployee();
                if ((_employeeRepository.ExistByCondition(x => (x.Name == employeeEntity.Name && x.Id == employeeEntity.Id))) || (!_employeeRepository.ExistByCondition(x => x.Name == employeeEntity.Name)))
                {
                    var updatedEmployeeEntity = _employeeRepository.Update(employeeEntity);
                    unitOfWork.SaveChanges();

                    updatedEmployeeDTO = mapper.Map<DTOEmployee>(updatedEmployeeEntity);

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
                if (!_userRepository.ExistByCondition(x => x.EmployeeId == employeeId))
                {
                    _employeeRepository.Delete(employeeId);
                    unitOfWork.SaveChanges();

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
