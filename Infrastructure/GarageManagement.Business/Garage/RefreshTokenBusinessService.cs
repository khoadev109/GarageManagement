using AutoMapper;
using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.ServiceInterface.Result;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface;

namespace GarageManagement.Business.Garage
{
    public class RefreshTokenBusinessService : ServiceBase<GarageDbContext>, IRefreshTokenBusinessService
    {
        public IMapper _mapper;

        public RefreshTokenBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _mapper = mapper;
        }

        public Task<DataResult<DTORefreshToken>> FindRefreshTokenAsync(string refreshToken)
        {
            return Task.Run(() => {

                var findedToken = _unitOfWork.GetRepository<RefreshToken>().GetFirstOrDefault(i => i.Token == refreshToken);
                var findedTokenDTO = _mapper.Map<DTORefreshToken>(findedToken);

                return new DataResult<DTORefreshToken> { Errors = new List<ErrorDescriber>(), Target = findedTokenDTO };
            });
        }

        public Task<DataResult<bool>> AddRefreshTokenAsync(DTORefreshToken refreshTokenDTO)
        {
            return Task.Run(() => {

                bool result = false;
                var refreshTokenRepository = _unitOfWork.GetRepository<RefreshToken>();

                var existingToken = refreshTokenRepository.GetFirstOrDefault(r => r.UserId == refreshTokenDTO.UserId);
                if (existingToken != null)
                {
                    result = RemoveToken(existingToken);
                }
                else
                {
                    var newToken = _mapper.Map<RefreshToken>(refreshTokenDTO);
                    refreshTokenRepository.Insert(newToken);

                    result = _unitOfWork.SaveChanges() > 0;
                }

                return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = result };
            });
        }

        public Task<DataResult<bool>> RemoveRefreshTokenAsync(DTORefreshToken refreshTokenDTO)
        {
            return Task.Run(() =>
            {
                var refreshToken = _mapper.Map<RefreshToken>(refreshTokenDTO);
                var result = RemoveToken(refreshToken);
                
                return new DataResult<bool> { Errors = new List<ErrorDescriber>(), Target = result };
            });
        }

        private bool RemoveToken(RefreshToken refreshToken)
        {
            _unitOfWork.GetRepository<RefreshToken>().Delete(refreshToken.Id);
            return _unitOfWork.SaveChanges() > 0;
        }
    }
}
