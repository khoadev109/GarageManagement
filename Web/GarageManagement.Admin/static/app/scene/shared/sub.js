import * as React from "react";
import { Route } from "react-router-dom";
import { Dashboard } from "../dashboard/index";
import { GarageForm } from "../garage/component/container/garage-form";
import { Categories } from "../category/component/container/categories-paging";
import { Accessaries } from "../accessary/component/container/accessaries-paging";
import { ServiceTypes } from './../service-type/component/container/service-type-paging';
import { PublicServices } from "../public-service/component/container/services-paging";
import { Customers } from "../customer/component/container/customers-paging";
const Sub = () => (React.createElement("div", { id: "page-wrapper", className: "gray-bg" },
    React.createElement(Route, { exact: true, path: "/admin", component: Dashboard }),
    React.createElement(Route, { exact: true, path: "/admin/insurers" }),
    React.createElement(Route, { exact: true, path: "/admin/manufacturers" }),
    React.createElement(Route, { exact: true, path: "/admin/models" }),
    React.createElement(Route, { exact: true, path: "/admin/years" }),
    React.createElement(Route, { exact: true, path: "/admin/service-types", component: ServiceTypes }),
    React.createElement(Route, { exact: true, path: "/admin/public-service", component: PublicServices }),
    React.createElement(Route, { exact: true, path: "/admin/customer-types" }),
    React.createElement(Route, { exact: true, path: "/admin/customers", component: Customers }),
    React.createElement(Route, { exact: true, path: "/admin/suppliers" }),
    React.createElement(Route, { exact: true, path: "/admin/staffs" }),
    React.createElement(Route, { exact: true, path: "/admin/categories", component: Categories }),
    React.createElement(Route, { exact: true, path: "/admin/accessaries", component: Accessaries }),
    React.createElement(Route, { exact: true, path: "/admin/receipts" }),
    React.createElement(Route, { exact: true, path: "/admin/pay-slip" }),
    React.createElement(Route, { exact: true, path: "/admin/repair-quotes" }),
    React.createElement(Route, { exact: true, path: "/admin/lookup-quotes" }),
    React.createElement(Route, { exact: true, path: "/admin/lookup-customer-info" }),
    React.createElement(Route, { exact: true, path: "/admin/lookup-commodity" }),
    React.createElement(Route, { exact: true, path: "/admin/sales" }),
    React.createElement(Route, { exact: true, path: "/admin/lookup-code-of-commodity" }),
    React.createElement(Route, { exact: true, path: "/admin/lookup-exchange" }),
    React.createElement(Route, { exact: true, path: "/admin/partner-customers" }),
    React.createElement(Route, { exact: true, path: "/admin/partner-suppliers" }),
    React.createElement(Route, { exact: true, path: "/admin/categories", component: Categories }),
    React.createElement(Route, { exact: true, path: "/admin/manage-price" }),
    React.createElement(Route, { exact: true, path: "/admin/create-category" }),
    React.createElement(Route, { exact: true, path: "/admin/list-repaired" }),
    React.createElement(Route, { exact: true, path: "/admin/expiration-of-service" }),
    React.createElement(Route, { exact: true, path: "/admin/setup-auto-remind" }),
    React.createElement(Route, { exact: true, path: "/admin/revenue-sales" }),
    React.createElement(Route, { exact: true, path: "/admin/settings", component: GarageForm }),
    React.createElement(Route, { exact: true, path: "/admin/setting-bill" }),
    React.createElement(Route, { exact: true, path: "/admin/members" }),
    React.createElement(Route, { exact: true, path: "/admin/branches" }),
    React.createElement(Route, { exact: true, path: "/admin/history" }),
    React.createElement(Route, { exact: true, path: "/admin/delete-history" })));
export default Sub;
//# sourceMappingURL=sub.js.map