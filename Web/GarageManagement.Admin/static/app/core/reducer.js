import { combineReducers } from "redux";
import { LoginReducer } from "../scene/login/reducer/auth-reducer";
import { LogoutReducer } from "../scene/login/reducer/auth-reducer";
import { GarageInformationReducer } from "../scene/garage/reducer/fetch-reducer";
import { GarageUpdateReducer } from "../scene/garage/reducer/post-reducer";
import { CustomerReducer, CustomersWithPagingReducer } from "../scene/customer/reducer/fetch-reducer";
import { CustomerCreateReducer, CustomerEditReducer, CustomerDeleteReducer } from "../scene/customer/reducer/post-reducer";
import { PublicServReducer, AllPublicServReducer, PublicServsWithPagingReducer } from "../scene/public-service/reducer/fetch-reducer";
import { PublicServCreateReducer, PublicServEditReducer, PublicServDeleteReducer } from "../scene/public-service/reducer/post-reducer";
import { AccessaryReducer, AllAccessariesReducer, AccessariesWithPagingReducer } from "../scene/accessary/reducer/fetch-reducer";
import { AccessaryCreateReducer, AccessaryEditReducer, AccessaryDeleteReducer } from "../scene/accessary/reducer/post-reducer";
import { ServiceTypeReducer, ServiceTypeWithPagingReducer } from "../scene/service-type/reducer/fetch-reducer";
import { ServiceTypeCreateReducer, ServiceTypeEditReducer, ServiceTypeDeleteReducer } from "../scene/service-type/reducer/post-reducer";
import { CategoryReducer, CategoriesWithPagingReducer, ParentCategoriesReducer } from "../scene/category/reducer/fetch-reducer";
import { CategoryCreateReducer, CategoryEditReducer, CategoryDeleteReducer } from "../scene/category/reducer/post-reducer";
export const ResponseState = {
    target: [],
    isFetched: false,
    loading: false,
    error: Error
};
const rootReducer = combineReducers({
    LoginReducer,
    GarageInformationReducer,
    GarageUpdateReducer,
    LogoutReducer,
    CustomerReducer,
    CustomersWithPagingReducer,
    CustomerCreateReducer,
    CustomerEditReducer,
    CustomerDeleteReducer,
    PublicServReducer,
    AllPublicServReducer,
    PublicServsWithPagingReducer,
    PublicServCreateReducer,
    PublicServEditReducer,
    PublicServDeleteReducer,
    AccessaryReducer,
    AllAccessariesReducer,
    AccessariesWithPagingReducer,
    AccessaryCreateReducer,
    AccessaryEditReducer,
    AccessaryDeleteReducer,
    ServiceTypeReducer,
    ServiceTypeWithPagingReducer,
    ServiceTypeCreateReducer,
    ServiceTypeEditReducer,
    ServiceTypeDeleteReducer,
    CategoryReducer,
    CategoriesWithPagingReducer,
    ParentCategoriesReducer,
    CategoryCreateReducer,
    CategoryEditReducer,
    CategoryDeleteReducer
});
export default rootReducer;
//# sourceMappingURL=reducer.js.map