import { combineReducers } from "redux";

import { AsideReducer } from "scene/shared/aside/reducer";

import { LoginReducer } from "scene/login/reducer/authentication-reducer";
import { LogoutReducer } from "scene/login/reducer/authentication-reducer";

import { GarageInformationReducer } from "scene/garage/reducer/fetch-reducer";
import { GarageUpdateReducer } from "scene/garage/reducer/post-reducer";

import { CarCreateReducer, CarEditReducer, CarDeleteReducer } from "scene/car/reducer/post-reducer";
import { 
    CarReducer, CarByCustomerReducer, OwnedCarsReducer, 
    CarsWithPagingReducer, ModelsByManufacturerReducer, YearsByModelReducer
} 
from "scene/car/reducer/fetch-reducer";

import { CustomerReducer, SpecifyCustomerCarReducer, CustomersWithPagingReducer } from "scene/customer/reducer/fetch-reducer";
import { CustomerCreateReducer, CustomerEditReducer, CustomerDeleteReducer } from "scene/customer/reducer/post-reducer";

import { CustomerTypeReducer, CustomersTypeWithPagingReducer } from "scene/customer-type/reducer/fetch-reducer";
import { CustomerTypeCreateReducer, CustomerTypeEditReducer, CustomerTypeDeleteReducer } from "scene/customer-type/reducer/post-reducer";

// import { PublicServReducer, AllPublicServReducer, PublicServsWithPagingReducer } from "scene/public-service/reducer/fetch-reducer";
// import { PublicServCreateReducer, PublicServEditReducer, PublicServDeleteReducer } from "scene/public-service/reducer/post-reducer";

import { AccessaryReducer, AllAccessariesReducer, AccessariesWithPagingReducer } from "scene/accessary/reducer/fetch-reducer";
import { AccessaryCreateReducer, AccessaryEditReducer, AccessaryDeleteReducer } from "scene/accessary/reducer/post-reducer";

import { ServiceTypeReducer, ParentServiceTypesReducer, ServiceTypeWithPagingReducer } from "scene/service-type/reducer/fetch-reducer";
import { ServiceTypeCreateReducer, ServiceTypeEditReducer, ServiceTypeDeleteReducer } from "scene/service-type/reducer/post-reducer";

import { CategoryReducer, CategoriesWithPagingReducer, ParentCategoriesReducer } from "scene/category/reducer/fetch-reducer";
import { CategoryCreateReducer, CategoryEditReducer, CategoryDeleteReducer } from "scene/category/reducer/post-reducer";

import { EmployeeReducer, AllEmployeesReducer, EmployeesWithPagingReducer } from "scene/employee/reducer/fetch-reducer";
import { EmployeeCreateReducer, EmployeeEditReducer, EmployeeDeleteReducer } from "scene/employee/reducer/post-reducer";

import { BranchReducer, BranchesWithPagingReducer } from "scene/branch/reducer/fetch-reducer";
import { BranchCreateReducer, BranchEditReducer, BranchDeleteReducer } from "scene/branch/reducer/post-reducer";

import { ProvincesReducer, DistrictsReducer, WardsReducer } from "../locale/reducer/fetch-reducer";

import { GetPrintTemplateByStatusReducer } from "scene/print-template/reducer/fetch-reducer";
import { AddOrUpdatePrintTemplateReducer } from "scene/print-template/reducer/post-reducer";

import { CarModelReducer, AllCarModelsReducer, CarModelsWithPagingReducer } from "scene/car-model/reducer/fetch-reducer";
import { CarModelCreateReducer, CarModelEditReducer, CarModelDeleteReducer } from "scene/car-model/reducer/post-reducer";

import { 
    QuotationReducer, QuotationItemReducer, NewQuotationItemReducer, 
    ReceiptsReducer, PaySlipReducer, QuotationEmployeesReducer,
    PendingQuotationsReducer, QuotationItemsReducer, 
    CustomerAndOwnedCarsReducer, GetCustomerExchangeWithPagingReducer,
    AllQuotationReducer, AllQuotationItemsReducer, QuotationsPagingReducer, 
    SpecifyQuotationNoteReducer, QuotationItemsGroupByParentCategoriesReducer,
    QuotationItemsGroupByParentServiceTypesReducer,
    ReceiptsFilterAndPagingReducer, PayslipsFilterAndPagingReducer,
    AllQuotationsBySearchTermReducer
} from "scene/quotation/reducer/fetch-reducer";

import { 
    QuotationCreateReducer, QuotationEditReducer, QuotationChangeStatusReducer, 
    QuotationItemCreateReducer, QuotationItemEditReducer, QuotationItemDeleteReducer,
    QuotationMultipleItemCreateReducer, QuotationEmployeesUpdateReducer, QuotationItemsUpdateReducer,
    QuotationEditOnlyQuotationInfoReducer, ReceiptsCreateOrUpdateReducer, PaySlipCreateOrUpdateReducer, 
    QuotationNoteUpdateSpecifyStepReducer
} from "scene/quotation/reducer/post-reducer";

import { AccessaryUnitReducer, AccessaryUnitWithPagingReducer } from 'scene/accessary-unit/reducer/fetch-reducer';
import { AccessaryUnitCreateReducer, AccessaryUnitEditReducer, AccessaryUnitDeleteReducer} from 'scene/accessary-unit/reducer/post-reducer';
import { ServiceUnitReducer, ServiceUnitWithPagingReducer } from 'scene/service-unit/reducer/fetch-reducer';
import { ServiceUnitCreateReducer, ServiceUnitEditReducer, ServiceUnitDeleteReducer} from 'scene/service-unit/reducer/post-reducer';
import { ManufacturerReducer, AllManufacturerReducer, ManufacturersWithPagingReducer } from "scene/manufacturer/reducer/fetch-reducer";
import { ManufacturerCreateReducer, ManufacturerEditReducer, ManufacturerDeleteReducer } from "scene/manufacturer/reducer/post-reducer";
import { YearReducer, AllYearReducer, YearsWithPagingReducer } from "scene/year/reducer/fetch-reducer";
import { YearCreateReducer, YearEditReducer, YearDeleteReducer } from "scene/year/reducer/post-reducer";

import { GetPermissionByUserReducer, GetPermissionByRoleReducer, GetModuleReducer, GetRoleReducer, GetUserReducer } from "scene/role-right-module/reducer/fetch-reducer";
import { SavePermissionReducer } from "scene/role-right-module/reducer/post-reducer";

const rootReducer = combineReducers({
    AsideReducer,
    
    LoginReducer,
    LogoutReducer,

    ModelsByManufacturerReducer,
    YearsByModelReducer,

    ProvincesReducer,
    DistrictsReducer,
    WardsReducer,
    
    GarageInformationReducer,
    GarageUpdateReducer,
    
    CustomerReducer,
    SpecifyCustomerCarReducer,
    CustomersWithPagingReducer,
    CustomerCreateReducer,
    CustomerEditReducer,
    CustomerDeleteReducer,

    CarReducer,
    CarByCustomerReducer,
    OwnedCarsReducer,
    CarsWithPagingReducer,
    CarCreateReducer,
    CarEditReducer,
    CarDeleteReducer,

    CustomerTypeReducer,
    CustomersTypeWithPagingReducer,
    CustomerTypeCreateReducer,
    CustomerTypeEditReducer,
    CustomerTypeDeleteReducer,

    // PublicServReducer,
    // AllPublicServReducer,
    // PublicServsWithPagingReducer,
    // PublicServCreateReducer,
    // PublicServEditReducer,
    // PublicServDeleteReducer,

    AccessaryReducer,
    AllAccessariesReducer,
    AccessariesWithPagingReducer,
    AccessaryCreateReducer,
    AccessaryEditReducer,
    AccessaryDeleteReducer,

    ServiceTypeReducer,
    ParentServiceTypesReducer,
    ServiceTypeWithPagingReducer,
    ServiceTypeCreateReducer, 
    ServiceTypeEditReducer, 
    ServiceTypeDeleteReducer,

    CategoryReducer,
    CategoriesWithPagingReducer,
    ParentCategoriesReducer,
    CategoryCreateReducer,
    CategoryEditReducer,
    CategoryDeleteReducer,

    EmployeeReducer,
    AllEmployeesReducer,
    EmployeesWithPagingReducer,
    EmployeeCreateReducer,
    EmployeeEditReducer,
    EmployeeDeleteReducer,

    BranchReducer, 
    BranchesWithPagingReducer,
    BranchCreateReducer,
    BranchEditReducer, 
    BranchDeleteReducer,

    QuotationReducer,
    AllQuotationReducer,
    QuotationItemReducer,
    NewQuotationItemReducer,
    QuotationEmployeesReducer,
    ReceiptsReducer,
    PaySlipReducer,
    AllQuotationsBySearchTermReducer,
    PendingQuotationsReducer,
    AllQuotationItemsReducer,
    QuotationItemsReducer,
    QuotationsPagingReducer,
    CustomerAndOwnedCarsReducer,
    GetCustomerExchangeWithPagingReducer,
    SpecifyQuotationNoteReducer,
    QuotationItemsGroupByParentCategoriesReducer,
    QuotationItemsGroupByParentServiceTypesReducer,
    ReceiptsFilterAndPagingReducer,
    PayslipsFilterAndPagingReducer,

    QuotationCreateReducer,
    QuotationEditReducer,
    QuotationEditOnlyQuotationInfoReducer,
    QuotationChangeStatusReducer, 
    QuotationItemCreateReducer,
    QuotationItemEditReducer,
    QuotationItemDeleteReducer,
    QuotationMultipleItemCreateReducer,
    QuotationEmployeesUpdateReducer,
    QuotationItemsUpdateReducer,
    QuotationNoteUpdateSpecifyStepReducer,

    AccessaryUnitReducer, 
    AccessaryUnitWithPagingReducer,
    AccessaryUnitCreateReducer, 
    AccessaryUnitEditReducer, 
    AccessaryUnitDeleteReducer,

    ServiceUnitReducer, 
    ServiceUnitWithPagingReducer,
    ServiceUnitCreateReducer, 
    ServiceUnitEditReducer, 
    ServiceUnitDeleteReducer,
    ReceiptsCreateOrUpdateReducer,
    PaySlipCreateOrUpdateReducer,

    GetPrintTemplateByStatusReducer,
    AddOrUpdatePrintTemplateReducer,

    CarModelReducer,
    AllCarModelsReducer,
    CarModelsWithPagingReducer,
    CarModelCreateReducer,
    CarModelEditReducer,
    CarModelDeleteReducer,

    ManufacturerReducer, 
    AllManufacturerReducer, 
    ManufacturersWithPagingReducer, 
    ManufacturerCreateReducer, 
    ManufacturerEditReducer, 
    ManufacturerDeleteReducer,

    YearReducer, 
    AllYearReducer, 
    YearsWithPagingReducer,
    YearCreateReducer, 
    YearEditReducer, 
    YearDeleteReducer,

    GetPermissionByUserReducer, 
    GetPermissionByRoleReducer, 
    GetModuleReducer, 
    GetRoleReducer, 
    GetUserReducer,
    SavePermissionReducer
});

export default rootReducer;
