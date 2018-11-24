import React from "react";
import * as BaseComponent from "core/component/component";
import { ReceiptBills } from "../bill/receipts-bill-paging";
import { PaySlipBills } from "../bill/payslip-bill-paging";

class Tab { constructor(public Name: string, public Class: string) { } }

interface IBillsState { 
    HeaderTabs: Array<Tab>,
    ContentTabs: Array<Tab>,
}

export class Bills extends React.Component<any, IBillsState> implements BaseComponent.IComponentState {
    constructor(props: any) {
        super(props);
        this.initializeState();
    }

    initializeState() {
        this.state = {
            HeaderTabs: this.initializeHeaderTabs(true),
            ContentTabs: this.initializeContentTabs(true)
        }
    }

    initializeHeaderTabs(activeFirstTab: boolean = false) {
        let firstTabClass = activeFirstTab ? "active" : "";

        return new Array<Tab>(
            new Tab("Receipts", firstTabClass),
            new Tab("PaySlip", "")
        );
    }

    initializeContentTabs(activeFirstTab: boolean = false) {
        let defaultClass = "tab-pane";
        let firstTabClass = activeFirstTab ? defaultClass.concat(" active"): defaultClass; 

        return new Array<Tab>(
            new Tab("Receipts", firstTabClass),
            new Tab("PaySlip", defaultClass)
        );
    }

    setHeaderTabClass(tabName: string) {
        let tab: Tab = this.state.HeaderTabs.find(x => x.Name == tabName);
        return tab ? tab.Class : "";
    }

    setContentTabClass(tabName: string) {
        let tab: Tab = this.state.ContentTabs.find(x => x.Name == tabName);
        return tab ? tab.Class : "";
    }

    switchTab(tabName: string) {
        this.setState({ 
            HeaderTabs: this.setActiveHeaderTab(tabName),
            ContentTabs: this.setActiveContentTab(tabName)
        });
    }

    setActiveHeaderTab(tabName: string) {
        let newTabsSet: Array<Tab> = this.initializeHeaderTabs();
        newTabsSet.forEach((tab: Tab) => {
            if (tab.Name == tabName) 
                tab.Class = "active";
        });
        return newTabsSet;
    }

    setActiveContentTab(tabName: string) {
        let newTabsSet: Array<Tab> = this.initializeContentTabs();
        newTabsSet.forEach((tab: Tab) => {
            if (tab.Name == tabName) 
                tab.Class = tab.Class.concat(" active");
        });
        return newTabsSet;
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="tabs-container">
                    <ul className="nav nav-tabs">
                        <li className={this.setHeaderTabClass("Receipts")} onClick={() => this.switchTab("Receipts")}>
                            <a>Phiếu thu</a>
                        </li>
                        <li className={this.setHeaderTabClass("PaySlip")} onClick={() => this.switchTab("PaySlip")}>
                            <a>Phiếu chi</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div id="receipts-tab" className={this.setContentTabClass("Receipts")}>
                            <div className="panel-body">
                                <ReceiptBills />
                            </div>
                        </div>
                        <div id="payslip-tab" className={this.setContentTabClass("PaySlip")}>
                            <div className="panel-body">
                                <PaySlipBills />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
