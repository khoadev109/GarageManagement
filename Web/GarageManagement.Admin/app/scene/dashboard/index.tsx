import React from "react";
import { Footer } from "../shared/footer";

export const Dashboard = () => {
    return (
        <React.Fragment>
            <div className="wrapper wrapper-content">
                <div className="middle-box text-center animated fadeInRightBig">
                    <h3>Quản lý Garage 2018</h3> 
                    <small>(version 1.0)</small>
                    <br/>
                    <div className="error-desc">
                        Quản lý báo giá, thông tin khách hàng, đặt lịch bảo dưỡng, nhắc nhở bảo dưỡng và bán hàng
                        {/* <br/>
                        <a href="index.html" className="btn btn-primary m-t">Dashboard</a> */}
                    </div>
                </div>
            </div>
            <Footer/>    
        </React.Fragment>
    )
}
