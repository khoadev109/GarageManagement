import React from "react";
import { Route } from "react-router-dom";
import { Dashboard } from "../dashboard/index";
import { GarageForm } from "../garage/component/garage-form-component";
import { CategoryPaging } from "../category/component/category-paging-component";
import { AccessaryPaging } from "../accessary/component/accessary-paging-component";
import { AccessaryUnitPaging } from "../accessary-unit/component/accessary-unit-paging-component";
import { ServiceTypePaging } from '../service-type/component/service-type-paging-component';
import { PublicServices } from "../public-service/component/container/services-paging";
import { ServiceUnitPaging } from '../service-unit/component/service-unit-paging-component';
import { Customers } from "../customer/component/customers-paging-component";
import { CustomerTypePaging } from "../customer-type/component/customers-type-paging-component";
import { EmployeePaging } from "../employee/component/employees-paging-component";
import { BranchPaging } from "../branch/component/branches-paging-component";
import { NewQuotation } from "../quotation/component/container/new-quotation";
import { MainQuotation } from "../quotation/component/container/main-quotation";
import { LookupQuotations } from "../quotation/component/container/look-up-quotations";
import { ReceiptsBill } from "../quotation/component/container/bill/receipts-bill";
import { PaySlipBill } from "../quotation/component/container/bill/payslip-bill";
import { Bills } from "../quotation/component/container/bill/bills-paging";
import { BillPrintForm } from "../quotation/component/container/bill/bill-print-form";
import { PrintForm } from "../quotation/component/container/common-print-form";
import { PrintTemplate } from "../print-template/component/print-page";
import { CarModelPaging } from "../car-model/component/car-model-paging-component";
import { ManufacturerPaging } from "../manufacturer/component/manufacturers-paging-component";
import { YearPaging } from "../year/component/years-paging-component";
import { RoleRightModule } from "../role-right-module/component/container/role-right-module";

const Sub = () => (
    <div id="page-wrapper" className="gray-bg">
        <Route exact path="/admin" component={Dashboard} />
        <Route exact path="/admin/insurers" />
        <Route exact path="/admin/manufacturers" component={ManufacturerPaging} />
        <Route exact path="/admin/models" component={CarModelPaging} />
        <Route exact path="/admin/years" component={YearPaging} />
        <Route exact path="/admin/service-types" component={ServiceTypePaging} />
        <Route exact path="/admin/public-service" component={PublicServices} />
        <Route exact path="/admin/public-service-unit" component={ServiceUnitPaging} />
        <Route exact path="/admin/customer-types" component={CustomerTypePaging} />
        <Route exact path="/admin/customers" component={Customers} />
        <Route exact path="/admin/suppliers" />
        <Route exact path="/admin/employees" component={EmployeePaging} />
        <Route exact path="/admin/categories" component={CategoryPaging} />
        <Route exact path="/admin/accessaries" component={AccessaryPaging} />
        <Route exact path="/admin/accessaries-unit" component={AccessaryUnitPaging} />
        <Route exact path="/admin/receipts-bill/:receiptId?/:quotationId?" component={ReceiptsBill} />
        <Route exact path="/admin/payslip-bill/:payslipId?/:quotationId?" component={PaySlipBill} />
        <Route exact path="/admin/bills" component={Bills} />
        <Route exact path="/admin/create-quote" component={NewQuotation} />
        <Route exact path="/admin/waiting-quotes/:statusId" component={MainQuotation} />
        <Route exact path="/admin/lookup-maitaining-service-quotation/:lookupType" component={LookupQuotations} />
        <Route exact path="/admin/lookup-maintenance-expire-quotation/:lookupType" component={LookupQuotations} />
        <Route exact path="/admin/lookup-transaction-history-quotation/:lookupType" component={LookupQuotations} />
        <Route exact path="/admin/lookup-customer-info" />
        <Route exact path="/admin/lookup-commodity" />
        <Route exact path="/admin/sales" />
        <Route exact path="/admin/lookup-code-of-commodity" />
        <Route exact path="/admin/lookup-exchange" />
        <Route exact path="/admin/partner-customers" />
        <Route exact path="/admin/partner-suppliers" />        
        <Route exact path="/admin/manage-price" />
        <Route exact path="/admin/create-category" />
        <Route exact path="/admin/list-repaired" />
        <Route exact path="/admin/expiration-of-service" />
        <Route exact path="/admin/setup-auto-remind" />
        <Route exact path="/admin/revenue-sales" />
        <Route exact path="/admin/settings" component={GarageForm} />
        <Route exact path="/admin/role-right-module" component={RoleRightModule} />
        <Route exact path="/admin/print-template" component={PrintTemplate} />
        <Route exact path="/admin/members" />
        <Route exact path="/admin/branches" component={BranchPaging} />
        <Route exact path="/admin/history" />
        <Route exact path="/admin/delete-history" />
        <Route exact path="/admin/quotation-print/:quotationId/:quotationStatusId" component={PrintForm} />
        <Route exact path="/admin/bill-print/:billType/:id/:quotationId?" component={BillPrintForm} />
    </div>
)

export default Sub;
