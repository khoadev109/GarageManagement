import * as React from "react";
export class Navigation extends React.Component {
    constructor(props) {
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
    onLoadCustomersByPageSelected(pageIndex) {
        this.props.onLoadByPageSelectedNavigation(pageIndex);
    }
    showPrevButton() {
        if (this.props.HasPrevious)
            return (React.createElement("li", { className: "paginate_button previous" },
                React.createElement("a", { href: "javascript:void(0)", onClick: () => this.onLoadCustomersByPrevNavigation() }, "Tr\u01B0\u1EDBc")));
        else
            return (React.createElement("li", { className: "paginate_button previous disabled" },
                React.createElement("a", { href: "javascript:void(0)" }, "Tr\u01B0\u1EDBc")));
    }
    showNextButton() {
        if (this.props.HasNext)
            return (React.createElement("li", { className: "paginate_button next" },
                React.createElement("a", { href: "javascript:void(0)", onClick: () => this.onLoadCustomersByNextNavigation() }, "Sau")));
        else
            return (React.createElement("li", { className: "paginate_button next disabled" },
                React.createElement("a", { href: "javascript:void(0)" }, "Sau")));
    }
    setPagingAndActiveClass(pageIndex) {
        let pageButtonClass = "paginate_button";
        let activePageClass = this.props.CurrentPage == pageIndex ? " active" : "";
        return `${pageButtonClass} ${activePageClass}`;
    }
    showPageRangeButton() {
        let range = new Array();
        for (let i = this.props.PageRange.FromPage; i <= this.props.PageRange.ToPage; i++) {
            range.push(i);
        }
        return (range.map((page, index) => {
            return (React.createElement("li", { className: this.setPagingAndActiveClass(page), key: page },
                React.createElement("a", { href: "javascript:void(0)", onClick: () => this.onLoadCustomersByPageSelected(page) }, page)));
        }, this));
    }
    render() {
        return (React.createElement("div", { className: "dataTables_paginate paging_simple_numbers", id: this.props.Id },
            React.createElement("ul", { className: "pagination" },
                this.showPrevButton(),
                this.showPageRangeButton(),
                this.showNextButton())));
    }
}
//# sourceMappingURL=navigation.js.map