using AutoMapper;
using System.Linq;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.RepositoryInterface;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;

namespace GarageManagement.Business.Garage
{
    public class UserBusinessService : ServiceBase<GarageDbContext>, IUserBusinessService
    {
        public IMapper _mapper;

        public UserBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
        }

        public Task<DataResult<DTOUser>> GetUserByIdAsync(int userId)
        {
            return Task.Run(() => {

                var user = _unitOfWork.DbContext.Users.Include("Employee")
                                                             .Where(x => x.Id == userId)
                                                             .Select(x => new DTOUser
                                                             {
                                                                 UserId = x.Id,
                                                                 Email = x.Email,
                                                                 RoleId = x.RoleId,
                                                                 RoleName = x.Role.Name,
                                                                 UserName = x.LoginName,
                                                                 FullName = x.Employee.Name
                                                             }).FirstOrDefault();
                var userDTO = _mapper.Map<DTOUser>(user);

                return new DataResult<DTOUser> { Errors = new List<ErrorDescriber>(), Target = userDTO };
            });
        }

        public Task<DataResult<DTOUser>> CheckValidAuthenticationAndGetUserIsValidAsync(string userName, string password)
        {
            return Task.Run(() => {

                var authenticatedUser = _unitOfWork.DbContext.Users.Include("Employee")
                                                             .Where(x => x.LoginName == userName && x.Password == password)
                                                             .Select(x => new DTOUser {
                                                                 UserId = x.Id,
                                                                 Email = x.Email,
                                                                 RoleId = x.RoleId,
                                                                 RoleName = x.Role.Name,
                                                                 UserName = x.LoginName,
                                                                 FullName = x.Employee.Name,
                                                                 Phone = x.Employee.Phone
                                                             });

                return new DataResult<DTOUser> { Errors = new List<ErrorDescriber>(), Target = authenticatedUser.FirstOrDefault() };
            });
        }

        public Task<DataResult<List<DTOUser>>> Get()
        {
            return Task.Run(() =>
            {
                var user = _unitOfWork.DbContext.Users
                                                .Select(x => new DTOUser
                                                {
                                                    UserId = x.Id,
                                                    Email = x.Email,
                                                    RoleId = x.RoleId,
                                                    RoleName = x.Role.Name,
                                                    UserName = x.LoginName,
                                                    FullName = x.Employee.Name
                                                }).ToList();
                var userDTO = _mapper.Map<List<DTOUser>>(user);

                return new DataResult<List<DTOUser>> { Errors = new List<ErrorDescriber>(), Target = userDTO };
            });
        }
    }
}
