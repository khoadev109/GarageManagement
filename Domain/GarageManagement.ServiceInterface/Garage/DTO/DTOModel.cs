using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GarageManagement.ServiceInterface.Garage.DTO
{
    public class DTOModel : DTOBase
    {
        public DTOModel()
        {
            Styles = new List<DTOStyle>();
            Manufacturers = new List<DTOManufacturer>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int StyleId { get; set; }
        public string StyleName { get; set; }
        public int ManufacturerId { get; set; }
        public string ManufacturerName { get; set; }

        public List<DTOStyle> Styles { get; set; }
        public List<DTOManufacturer> Manufacturers { get; set; }
    }
}
