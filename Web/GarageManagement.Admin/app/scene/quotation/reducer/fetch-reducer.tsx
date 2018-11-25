import { ActionType as AT } from "../action/action-type";
import CoreReducer from "core/redux/reducer";

export const QuotationReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_QUOTATION_REQUEST), (typeof AT.GET_UNIQUE_QUOTATION_SUCCESS), (typeof AT.GET_UNIQUE_QUOTATION_ERROR)>(action);

export const AllQuotationReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_ALL_SPECIFIED_QUOTATION_INFO_REQUEST), (typeof AT.GET_ALL_SPECIFIED_QUOTATION_INFO_SUCCESS), (typeof AT.GET_ALL_SPECIFIED_QUOTATION_INFO_ERROR)>(action);

export const QuotationItemReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_QUOTATION_ITEM_REQUEST), (typeof AT.GET_UNIQUE_QUOTATION_ITEM_SUCCESS), (typeof AT.GET_UNIQUE_QUOTATION_ITEM_ERROR)>(action);

export const NewQuotationItemReducer = 
(action: any) => CoreReducer.Create<(typeof AT.INITIALIZE_NEW_QUOTATION_ITEM_REQUEST), (typeof AT.INITIALIZE_NEW_QUOTATION_ITEM_SUCCESS), (typeof AT.INITIALIZE_NEW_QUOTATION_ITEM_ERROR)>(action);

export const QuotationEmployeesReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_EMPLOYEES_BY_QUOTATION_REQUEST), (typeof AT.GET_EMPLOYEES_BY_QUOTATION_SUCCESS), (typeof AT.GET_EMPLOYEES_BY_QUOTATION_ERROR)>(action);

export const ReceiptsReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_RECEIPT_REQUEST), (typeof AT.GET_UNIQUE_RECEIPT_SUCCESS), (typeof AT.GET_UNIQUE_RECEIPT_ERROR)>(action);

export const PaySlipReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_PAYSLIP_REQUEST), (typeof AT.GET_UNIQUE_PAYSLIP_SUCCESS), (typeof AT.GET_UNIQUE_PAYSLIP_ERROR)>(action);

export const ReceiptsFilterAndPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.RECEIPTS_PAGING_REQUEST), (typeof AT.RECEIPTS_PAGING_SUCCESS), (typeof AT.RECEIPTS_PAGING_ERROR)>(action);

export const PayslipsFilterAndPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.PAYSLIP_PAGING_REQUEST), (typeof AT.PAYSLIP_PAGING_SUCCESS), (typeof AT.PAYSLIP_PAGING_ERROR)>(action);

export const AllQuotationsBySearchTermReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_ALL_QUOTATIONS_BY_SEARCH_TERM_REQUEST), (typeof AT.GET_ALL_QUOTATIONS_BY_SEARCH_TERM_SUCCESS), (typeof AT.GET_ALL_QUOTATIONS_BY_SEARCH_TERM_ERROR)>(action);

export const PendingQuotationsReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_PENDING_QUOTATIONS_REQUEST), (typeof AT.GET_PENDING_QUOTATIONS_SUCCESS), (typeof AT.GET_PENDING_QUOTATIONS_ERROR)>(action);

export const AllQuotationItemsReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_ALL_QUOTATION_ITEMS_REQUEST), (typeof AT.GET_ALL_QUOTATION_ITEMS_SUCCESS), (typeof AT.GET_ALL_QUOTATION_ITEMS_ERROR)>(action);

export const QuotationItemsReducer = 
(action: any) => CoreReducer.Create<(typeof AT.LIST_ITEMS_BY_QUOTATION_REQUEST), (typeof AT.LIST_ITEMS_BY_QUOTATION_SUCCESS), (typeof AT.LIST_ITEMS_BY_QUOTATION_ERROR)>(action);

export const GetCustomerExchangeWithPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.CUSTOMER_EXCHANGE_WITH_PAGING_REQUEST), (typeof AT.CUSTOMER_EXCHANGE_WITH_PAGING_SUCCESS), (typeof AT.CUSTOMER_EXCHANGE_WITH_PAGING_ERROR)>(action);

export const CustomerAndOwnedCarsReducer = 
(action: any) => CoreReducer.Create<(typeof AT.FILTER_CUSTOMER_OWNED_CARS_REQUEST), (typeof AT.FILTER_CUSTOMER_OWNED_CARS_SUCCESS), (typeof AT.FILTER_CUSTOMER_OWNED_CARS_ERROR)>(action);

export const QuotationsPagingReducer = 
(action: any) => CoreReducer.Create<(typeof AT.LIST_QUOTATION_WITH_PAGING_REQUEST), (typeof AT.LIST_QUOTATION_WITH_PAGING_SUCCESS), (typeof AT.LIST_QUOTATION_WITH_PAGING_ERROR)>(action);

export const SpecifyQuotationNoteReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_UNIQUE_QUOTATION_NOTE_REQUEST), (typeof AT.GET_UNIQUE_QUOTATION_NOTE_SUCCESS), (typeof AT.GET_UNIQUE_QUOTATION_NOTE_ERROR)>(action);

export const QuotationItemsGroupByParentCategoriesReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_CATEGORY_REQUEST), (typeof AT.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_CATEGORY_SUCCESS), (typeof AT.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_CATEGORY_ERROR)>(action);

export const QuotationItemsGroupByParentServiceTypesReducer = 
(action: any) => CoreReducer.Create<(typeof AT.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_SERVICE_TYPE_REQUEST), (typeof AT.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_SERVICE_TYPE_SUCCESS), (typeof AT.GET_QUOTATION_ITEMS_GROUP_BY_PARENT_SERVICE_TYPE_ERROR)>(action);
