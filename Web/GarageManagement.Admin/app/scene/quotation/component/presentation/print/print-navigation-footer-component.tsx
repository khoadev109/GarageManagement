import React from "react";
import { QuotationStatus } from "../../../state/quotation-info-state";
import { CheckUpFooter } from "./check-up-footer-component";
import { CompleteOrderFooter } from "./complete-order-footer-component";
import { MaterialExportFooter } from "./material-export-footer-component";
import { RepairCommandFooter } from "./repair-command-footer-component";
import { QuotationFooter } from "./quotation-footer-component";
import { CustomerRequestFooter } from "../print/customer-request-footer-component";

interface IPrintNavigateFooterProps {
    PrintTemplate: string,
    QuotationStatus: QuotationStatus
}

export const PrintNavigationFooter = (props: IPrintNavigateFooterProps) => {
    let footerComponent = null;
    
    if (props.QuotationStatus == QuotationStatus.RequestFromCustomer)
        footerComponent = <CustomerRequestFooter PrintTemplate={props.PrintTemplate} />;
    if (props.QuotationStatus == QuotationStatus.Quotation)
        footerComponent = <QuotationFooter PrintTemplate={props.PrintTemplate} />;
    if (props.QuotationStatus == QuotationStatus.RepairCommand)
        footerComponent = <RepairCommandFooter PrintTemplate={props.PrintTemplate} />;
    if (props.QuotationStatus == QuotationStatus.ExportMaterial)
        footerComponent = <MaterialExportFooter PrintTemplate={props.PrintTemplate} />;
    if (props.QuotationStatus == QuotationStatus.Complete)
        footerComponent = <CompleteOrderFooter PrintTemplate={props.PrintTemplate} />;
    if (props.QuotationStatus == QuotationStatus.CheckUp)
        footerComponent = <CheckUpFooter PrintTemplate={props.PrintTemplate} />;

    return (
        <React.Fragment>
            {footerComponent}
        </React.Fragment>
    )
}
