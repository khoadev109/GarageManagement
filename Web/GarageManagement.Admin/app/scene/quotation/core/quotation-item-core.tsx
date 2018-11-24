import { Dictionary } from "core/library/dictionary";

export module QuotationItemHelper {
    export function setWidthPercentageForAllColumns(itemColumnWidths: Dictionary.IKeyedCollection<{}>) {
        itemColumnWidths.RemoveAll();
        itemColumnWidths.Add("Accessary", { width: "12%" });
        itemColumnWidths.Add("Service", { width: "12%" });
        itemColumnWidths.Add("Employee", { width: "12%" });
        itemColumnWidths.Add("UnitName", Object.assign({paddingTop: 15}, { width: "3%" }));
        itemColumnWidths.Add("UnitPrice", Object.assign({paddingTop: 15}, { width: "7%" }));
        itemColumnWidths.Add("EmployeeName", Object.assign({paddingTop: 15}, { width: "12%" }));
        itemColumnWidths.Add("Quantity", { width: "6%" });
        itemColumnWidths.Add("Discount", { width: "6%" });
        itemColumnWidths.Add("FinalPrice", Object.assign({paddingTop: 15}, { width: "7%" }));
        itemColumnWidths.Add("TotalPrice", Object.assign({paddingTop: 15}, { width: "7%" }));
        itemColumnWidths.Add("Action", { width: "4%" });
    }
    
    export function setWidthPercentageForColumnsWithoutPrice(itemColumnWidths: Dictionary.IKeyedCollection<{}>) {
        itemColumnWidths.RemoveAll();
        itemColumnWidths.Add("Accessary", { width: "15%" });
        itemColumnWidths.Add("Service", { width: "15%" });
        itemColumnWidths.Add("Employee", { width: "15%" });
        itemColumnWidths.Add("UnitName", Object.assign({paddingTop: 15}, { width: "4%" }));
        itemColumnWidths.Add("EmployeeName", Object.assign({paddingTop: 15}, { width: "15%" }));
        itemColumnWidths.Add("Quantity", { width: "6%" });
        itemColumnWidths.Add("Discount", { width: "6%" });
        itemColumnWidths.Add("Action", { width: "5%" });
    }

    export function setWidthPercentageForAllColumnsInQuotationPrint(itemColumnWidths: Dictionary.IKeyedCollection<{}>) {
        itemColumnWidths.RemoveAll();
        itemColumnWidths.Add("Accessary", { width: "12%" });
        itemColumnWidths.Add("Service", { width: "12%" });
        itemColumnWidths.Add("Employee", { width: "12%" });
        itemColumnWidths.Add("UnitName", Object.assign({paddingTop: 15}, { width: "3%" }));
        itemColumnWidths.Add("UnitPrice", Object.assign({paddingTop: 15}, { width: "7%" }));
        itemColumnWidths.Add("EmployeeName", Object.assign({paddingTop: 15}, { width: "12%" }));
        itemColumnWidths.Add("Quantity", { width: "6%" });
        itemColumnWidths.Add("Discount", { width: "6%" });
        itemColumnWidths.Add("FinalPrice", Object.assign({paddingTop: 15}, { width: "7%" }));
        itemColumnWidths.Add("TotalPrice", Object.assign({paddingTop: 15}, { width: "7%" }));
        itemColumnWidths.Add("Action", { width: "4%" });
    }
}
