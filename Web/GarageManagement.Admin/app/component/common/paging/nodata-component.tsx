import * as React from "react";
import ReactDOM from "react-dom";

export interface INoDataProps {
    ColSpan?: number
}

export const NoData = (props: INoDataProps) => (
    <tr>
        <td colSpan={props.ColSpan} className="no-data text-center">
            <h4>Chưa có dữ liệu</h4>
        </td>
    </tr>
)

export const NoDataText = () => (<h4 className="text-center">Chưa có dữ liệu</h4>)
