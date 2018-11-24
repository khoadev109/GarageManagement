import * as React from "react";
import Sub from "./sub";
import { Aside } from "./aside/aside";
import { Header } from "./header";
import AuthenticatedComponent from "../../component/common/auth/authenticated-component";

export default AuthenticatedComponent(class Layout extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <Aside />
                <Header />
                <Sub />  
            </div>
        );
    }
});
