import React from "react";
import { NavLink } from "react-router-dom";
import { QuotationStatus } from "../../state/quotation-info-state";

interface IQuotationMenuProps {
    activeStatus: QuotationStatus,
    onSelectQuotationStatus: (status: QuotationStatus) => void
}

const marginRightStyle = { marginRight: 10 };

export class QuotationMenu extends React.Component<IQuotationMenuProps> {
    constructor(props: IQuotationMenuProps) {
        super(props);
    }

    onSelect(status: QuotationStatus) {
        this.props.onSelectQuotationStatus(status);
    }

    setMenuClass(status: QuotationStatus, isLastMenuItem: boolean = false) {
        return this.props.activeStatus == status ? "btn btn-primary" : "btn btn-outline btn-primary";
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="ibox float-e-margins">
                    <div className="ibox-content text-center">
                        <form role="form" className="form-inline" id="quotation-form">
                            <div className="form-group" style={marginRightStyle}>
                                <NavLink to="/admin/waiting-quotes/1" className={this.setMenuClass(QuotationStatus.RequestFromCustomer)}
                                         onClick={() => this.onSelect(QuotationStatus.RequestFromCustomer)}>Tiếp nhận xe</NavLink>
                            </div>
                            <div className="form-group" style={marginRightStyle}>
                                <NavLink to="/admin/waiting-quotes/2" className={this.setMenuClass(QuotationStatus.Quotation)}
                                         onClick={() => this.onSelect(QuotationStatus.Quotation)}>Báo giá</NavLink>
                            </div>
                            <div className="form-group" style={marginRightStyle}>
                                <NavLink to="/admin/waiting-quotes/4" className={this.setMenuClass(QuotationStatus.RepairCommand)}
                                         onClick={() => this.onSelect(QuotationStatus.RepairCommand)}>Lệnh sửa chữa</NavLink>
                            </div>
                            <div className="form-group" style={marginRightStyle}>
                                <NavLink to="/admin/waiting-quotes/5" className={this.setMenuClass(QuotationStatus.ExportMaterial)}
                                         onClick={() => this.onSelect(QuotationStatus.ExportMaterial)}>Xuất vật tư</NavLink>
                            </div>
                            <div className="form-group" style={marginRightStyle}>
                                <NavLink to="/admin/waiting-quotes/6" className={this.setMenuClass(QuotationStatus.Complete)}
                                         onClick={() => this.onSelect(QuotationStatus.Complete)}>Hoàn thành</NavLink>
                            </div>
                            <div className="form-group" style={marginRightStyle}>
                                <NavLink to="/admin/waiting-quotes/7" className={this.setMenuClass(QuotationStatus.CheckUp, true)}
                                         onClick={() => this.onSelect(QuotationStatus.CheckUp)}>Nghiệm thu</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
