export enum ActiveParentLink {
    None = "None",
    GeneralCategory = "ActiveGeneralCategory",
    ServiceAdvisor = "ActiveServiceAdvisor",
    WareHouse = "ActiveWareHouse",
    CustomerCare = "ActiveCustomerCare",
    Setting = "ActiveSetting"
}

export const ADMIN_ROUTE = "/admin";

export function IsParentGeneralCategory(parentLink: string) {
    const paths = new Array<string>(
        `${ADMIN_ROUTE}/insurers`,
        `${ADMIN_ROUTE}/manufacturers`,
        `${ADMIN_ROUTE}/models`,
        `${ADMIN_ROUTE}/years`,
        `${ADMIN_ROUTE}/service-types`,
        `${ADMIN_ROUTE}/public-service`,
        `${ADMIN_ROUTE}/public-service-unit`,
        `${ADMIN_ROUTE}/customer-types`,
        `${ADMIN_ROUTE}/customers`,
        `${ADMIN_ROUTE}/suppliers`,
        `${ADMIN_ROUTE}/staffs`,
        `${ADMIN_ROUTE}/categories`,
        `${ADMIN_ROUTE}/accessaries`,
        `${ADMIN_ROUTE}/receipts`,
        `${ADMIN_ROUTE}/pay-slip`,
        `${ADMIN_ROUTE}/accessaries-unit`
    );
    return paths.some(link => link == parentLink);
}

export function IsParentServiceAdvisor(parentLink: string) {
    const paths = new Array<string>(
        `${ADMIN_ROUTE}/create-quote`,
        `${ADMIN_ROUTE}/waiting-quotes`,
        `${ADMIN_ROUTE}//lookup-quotes`,
        `${ADMIN_ROUTE}/lookup-customer-info`,
        `${ADMIN_ROUTE}/lookup-commodity`,
        `${ADMIN_ROUTE}/admin/bills`
    );
    return paths.some(link => link == parentLink);
};

export function IsParentCustomerCare(parentLink: string) {
    const paths = new Array<string>(
        `${ADMIN_ROUTE}/list-repaired`,
        `${ADMIN_ROUTE}/expiration-of-service`,
        `${ADMIN_ROUTE}/setup-auto-remind`,
        `${ADMIN_ROUTE}/revenue-sales`
    );
    return paths.some(link => link == parentLink);
};

export function IsParentSetting(parentLink: string) {
    const paths = new Array<string>(
        ADMIN_ROUTE,
        `${ADMIN_ROUTE}/settings`,
        `${ADMIN_ROUTE}/print-template`,
        `${ADMIN_ROUTE}/members`,
        `${ADMIN_ROUTE}/branches`,
        `${ADMIN_ROUTE}/history`,
        `${ADMIN_ROUTE}/delete-history`
    );
    return paths.some(link => link == parentLink);
};
