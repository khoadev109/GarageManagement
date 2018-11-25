using AutoMapper;
using System.Linq;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.RepositoryInterface;
using GarageManagement.Garage.Entity.Context;
using Common.Core.WebAPI.Result;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;

namespace GarageManagement.Business.Garage
{
    public class UserBusinessService : ServiceBase<GarageDbContext>, IUserBusinessService
    {
        public UserBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        { }

        public Task<DataResult<DTOUser>> GetUserByIdAsync(int userId)
        {
            return Task.Run(() =>
            {
                var user = Context.Users.Include("Employee").Where(x => x.Id == userId)
                                                            .Select(x => new DTOUser
                                                            {
                                                                UserId = x.Id,
                                                                Email = x.Email,
                                                                RoleId = x.RoleId,
                                                                RoleName = x.Role.Name,
                                                                UserName = x.LoginName,
                                                                FullName = x.Employee.Name
                                                            }).FirstOrDefault();
                var result = new DataResult<DTOUser>
                {
                    Target = mapper.Map<DTOUser>(user),
                    Errors = new List<ErrorDescriber>()
                };

                return result;
            });
        }

        public Task<DataResult<DTOUser>> CheckValidAuthenticationAndGetUserIsValidAsync(string userName, string password)
        {
            return Task.Run(() =>
            {

                var authenticatedUser = Context.Users.Include("Employee")
                                                             .Where(x => x.LoginName == userName && x.Password == password)
                                                             .Select(x => new DTOUser
                                                             {
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
                var user = Context.Users.Select(x => new DTOUser
                {
                    UserId = x.Id,
                    Email = x.Email,
                    RoleId = x.RoleId,
                    RoleName = x.Role.Name,
                    UserName = x.LoginName,
                    FullName = x.Employee.Name
                }).ToList();

                var result = new DataResult<List<DTOUser>>
                {
                    Target = mapper.Map<List<DTOUser>>(user),
                    Errors = new List<ErrorDescriber>()
                };

                return result;
            });
        }
    }
}
