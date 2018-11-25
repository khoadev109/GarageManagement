import React from "react";
import { ICar } from "../../../../../car/state/car-state";
import { ICustomer } from "../../../../state/customer-info-state";
import { formatNumberWithCommaSeparator } from "../../../../../../core/library/data-type";

interface ICustomerProps {
    BillType: string,
    Customer: ICustomer,
    Car: ICar,
}

export const CustomerCarInfo = (props: ICustomerProps) => {
    return (
        <React.Fragment>
            <tr style={{display : props.BillType == "payslip" ? "none" : ""}}>
                <td>Khách hàng:</td>
                <td><strong>{props.Customer.Name}</strong></td>
                <td>Điện thoại:</td>
                <td>{props.Customer.Phone}</td>
            </tr>
            <tr style={{display : props.BillType == "payslip" ? "none" : ""}}>
                <td>Địa chỉ:</td>
                <td>{props.Customer.Address}</td>
                <td>Email:</td>
                <td>{props.Customer.Email}</td>
            </tr>
            <tr>
                <td>Biển số xe:</td>
                <td><strong>{props.Car.LicensePlates}</strong></td>
                <td>Số Vin:</td>
                <td><strong>{props.Car.VinNumber}</strong></td>
            </tr>
            <tr>
                <td>Số Km:</td>
                <td>{formatNumberWithCommaSeparator(props.Car.Km)}</td>
                <td>Màu xe:</td>
                <td>{props.Car.Color}</td>
            </tr>
        </React.Fragment>
    )
}
