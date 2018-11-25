using AutoMapper;
using System.Threading.Tasks;
using System.Collections.Generic;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using Common.Core.WebAPI.Result;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.RepositoryInterface;

namespace GarageManagement.Business.Garage
{
    public class GarageBusinessService : ServiceBase<GarageDbContext>, IGarageBusinessService
    {
        private readonly IRepository<GarageInfo> _garageInfoRepository;
        private readonly IRepository<GarageSetting> _garageSettingRepository;

        public GarageBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            base.mapper = mapper;
            _garageInfoRepository = base.unitOfWork.GetRepository<GarageInfo>();
            _garageSettingRepository = base.unitOfWork.GetRepository<GarageSetting>();
        }

        public Task<DataResult<DTOGarage>> GetGarageSettingInformationAsync()
        {
            return Task.Run(() =>
            {
                var garageSetting = _garageSettingRepository.GetFirstOrDefault(includes: x => x.Garage);

                return new DataResult<DTOGarage>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = mapper.Map<DTOGarage>(garageSetting.Garage)
                };
            });
        }

        public Task<DataResult<bool>> CreateOrUpdateGarageAsync(DTOGarage garageDTO)
        {
            return Task.Run(() =>
            {
                CreateOrUpdateGarageInfo(garageDTO);
                CreateOrUpdateGarageSetting(garageDTO);

                return new DataResult<bool>
                {
                    Errors = new List<ErrorDescriber>(),
                    Target = unitOfWork.SaveChanges() > 0
                };
            });
        }

        private void CreateOrUpdateGarageInfo(DTOGarage garageDTO)
        {
            var garageInfo = mapper.Map<GarageInfo>(garageDTO);

            if (garageDTO.Id == 0)
                _garageInfoRepository.Insert(garageInfo);
            else
                _garageInfoRepository.Update(garageInfo);
        }

        private void CreateOrUpdateGarageSetting(DTOGarage garageDTO)
        {
            var garageSetting = mapper.Map<GarageSetting>(garageDTO);
            
            if (garageDTO.Id == 0)
                _garageSettingRepository.Insert(garageSetting);
            else
                _garageSettingRepository.Update(garageSetting);
        }
    }
}
