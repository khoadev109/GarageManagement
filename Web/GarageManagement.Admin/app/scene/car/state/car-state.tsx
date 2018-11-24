export interface ICar {
    Id: string;
    GenerateId?: number;
    Color: string;
    VinNumber: string;
    MachineNumber: string;
    LicensePlates: string;
    Km: number;
    BranchId: string;
    BranchName: string;
    ManufacturerId: number;
    ManufacturerName: string;
    StyleId: number;
    StyleName: string;
    ModelId: number;
    ModelName: string;
    YearId: number;
    YearName: string;
    CurrentCarOwnerId?: string;
    CurrentCarOwnerName?: string;
}
