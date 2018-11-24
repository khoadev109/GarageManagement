import * as React from "react";

export class Footer extends React.Component<any> {
    constructor(props: any){
        super(props);
    }

    render() {
        return (
            <div className="footer">
                <div className="pull-right">
                    
                </div>
                <div>
                    <strong>Bản quyền</strong> Quản lý Garage &copy; 2018
                </div>
            </div>
        );
    }
}