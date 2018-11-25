using AutoMapper;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Common.Core.WebAPI.Result;
using GarageManagement.ServiceInterface.Garage;
using GarageManagement.ServiceInterface.Garage.DTO;
using GarageManagement.Garage.Entity.Context;
using GarageManagement.Garage.Entity.Entities;
using GarageManagement.RepositoryInterface;

namespace GarageManagement.Business.Garage
{
    public class StyleBusinessService : ServiceBase<GarageDbContext>, IStyleBusinessService
    {
        private readonly IRepository<Style> _styleRepository;

        public StyleBusinessService(IUnitOfWork<GarageDbContext> unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
            _styleRepository = unitOfWork.GetRepository<Style>();
        }

        public Task<DataResult<List<DTOStyle>>> GetAllAsync()
        {
            return Task.Run(() => {
                var styles = _styleRepository.GetAll().ToList();
                styles.Add(new Style { Id = 0, Name = "Chọn kiểu dáng" });

                var stylesDTO = mapper.Map<List<DTOStyle>>(styles.ToList());

                return new DataResult<List<DTOStyle>> { Errors = new List<ErrorDescriber>(), Target = stylesDTO };
            });
        }

        public Task<DataResult<List<DTOStyle>>> GetStylesByManufacturerAsync(int manufacturerId)
        {
            return Task.Run(() => {
                var styles = _styleRepository.Get(x => x.ManufacturerId == manufacturerId).ToList();
                var stylesDto = mapper.Map<List<DTOStyle>>(styles);

                return new DataResult<List<DTOStyle>> { Errors = new List<ErrorDescriber>(), Target = stylesDto };
            });
        }
    }
}
