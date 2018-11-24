import * as Service from "../../../../core/service/index";
const DEFAULT_PREFIX_COMPONENT = `${Service.DEFAULT_PREFIX_API}/Car`;
export const CAR_API = `${DEFAULT_PREFIX_COMPONENT}/Get`;
export const CARS_WITH_PAGING_API = `${DEFAULT_PREFIX_COMPONENT}/GetFilterCarsWithPaging`;
// Temporary
const DEFAULT_PREFIX_TEMP_COMPONENT = `${Service.DEFAULT_PREFIX_API}/Common`;
export const ALL_MANUFACTURERS_API = `${DEFAULT_PREFIX_TEMP_COMPONENT}/GetAllManufacturer`;
export const MODELS_BY_MANUFACTURER_API = `${DEFAULT_PREFIX_TEMP_COMPONENT}/GetModelByManufacturer`;
export const YEARS_BY_MODEL_API = `${DEFAULT_PREFIX_TEMP_COMPONENT}/GetYearByModelGet`;
//# sourceMappingURL=fetch-api-url.js.map