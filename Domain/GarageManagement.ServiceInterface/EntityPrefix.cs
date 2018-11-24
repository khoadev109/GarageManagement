using System.ComponentModel;

namespace GarageManagement.ServiceInterface
{
    public enum EntityPrefix
    {
        [DefaultValue("CN")]
        Branch = 1,
        [DefaultValue("KH")]
        Customer = 2,
        [DefaultValue("CDV")]
        Service = 3,
        [DefaultValue("PT")]
        Accessary = 4,
        [DefaultValue("XE")]
        Car = 5,
        [DefaultValue("NV")]
        Employee = 6,
        [DefaultValue("NBH")]
        Insurer = 7,
        [DefaultValue("BG")]
        Quotation = 8
    }
}
