import React from "react";
import { QuotationStatus } from "../../../model/quotation-info-model";
import { CheckUpFooter } from "../print/check-up-footer";
import { CompleteOrderFooter } from "../print/complete-order-footer";
import { MaterialExportFooter } from "../print/material-export-footer";
import { RepairCommandFooter } from "../print/repair-command-footer";
import { QuotationFooter } from "../print/quotation-footer";
import { CustomerRequestFooter } from "../print/customer-request-footer";

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
    );
}
