import * as React from "react";

interface INavigationProps extends INavigationPropsCallBack {
    Id: string,
    CurrentPage: number,
    HasNext: boolean,
    HasPrevious: boolean,
    PageRange: { 
        FromPage: number, 
        ToPage: number 
    }
}

interface INavigationPropsCallBack {
    onLoadByNextNavigation: () => void
    onLoadByPrevNavigation: () => void
    onLoadByPageSelectedNavigation: (pageIndex: number) => void
}

export class Navigation extends React.Component<INavigationProps, any> {
    constructor (props: INavigationProps) {
        super(props);

        this.onLoadCustomersByPageSelected = this.onLoadCustomersByPageSelected.bind(this);
        this.onLoadCustomersByNextNavigation = this.onLoadCustomersByNextNavigation.bind(this);
        this.onLoadCustomersByPrevNavigation = this.onLoadCustomersByPrevNavigation.bind(this);
    }
    
    onLoadCustomersByNextNavigation() {
        this.props.onLoadByNextNavigation();
    }

    onLoadCustomersByPrevNavigation() {
        this.props.onLoadByPrevNavigation();
    }

    onLoadCustomersByPageSelected(pageIndex: number) {
        this.props.onLoadByPageSelectedNavigation(pageIndex);
    }

    showPrevButton() {
        if (this.props.HasPrevious)
            return (
                <li className="paginate_button previous">
                    <a href="javascript:void(0)" onClick={() => this.onLoadCustomersByPrevNavigation()}>Trước</a>
                </li>
            )
        else
            return (
                <li className="paginate_button previous disabled">
                    <a href="javascript:void(0)">Trước</a>
                </li>
            )
    }
    
    showNextButton() {
        if (this.props.HasNext)
            return (
                <li className="paginate_button next">
                    <a href="javascript:void(0)" onClick={() => this.onLoadCustomersByNextNavigation()}>Sau</a>
                </li>
            )
        else
            return (
                <li className="paginate_button next disabled">
                    <a href="javascript:void(0)">Sau</a>
                </li>
            )
    }
    
    setPagingAndActiveClass(pageIndex: number) {
        let pageButtonClass = "paginate_button";
        let activePageClass = this.props.CurrentPage == pageIndex ? " active" : "";
        return `${pageButtonClass} ${activePageClass}`;
    }

    showPageRangeButton() {
        let range = new Array<number>();

        for (let i=this.props.PageRange.FromPage; i<=this.props.PageRange.ToPage; i++) {
            range.push(i);
        }

        return (
            range.map((page, index) => { 
                return (
                    <li className={this.setPagingAndActiveClass(page)} key={page}>
                        <a href="javascript:void(0)" onClick={() => this.onLoadCustomersByPageSelected(page)}>
                            {page}
                        </a>
                    </li>
                )
            }, this)
        )
    }
    
    render () {
        return (
            <div className="dataTables_paginate paging_simple_numbers" id={this.props.Id}>
                <ul className="pagination">
                    {this.showPrevButton()}
                    {this.showPageRangeButton()}
                    {this.showNextButton()}
                </ul>
            </div>
        )
    }
}
