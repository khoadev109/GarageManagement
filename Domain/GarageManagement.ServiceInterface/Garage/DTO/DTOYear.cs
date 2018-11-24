using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOYear : DTOBase
    {
        public DTOYear()
        {
            Models = new List<DTOModel>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int ModelId { get; set; }
        public string ModelName { get; set; }

        public List<DTOModel> Models { get; set; }
    }
}
