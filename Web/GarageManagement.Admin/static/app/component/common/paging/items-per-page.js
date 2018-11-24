import * as React from "react";
export class ItemsPerPage extends React.Component {
    constructor(props, context) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            Options: [10, 25, 50, 100],
            ItemValueSelected: 10
        };
    }
    onSelect(event) {
        this.state = {
            Options: this.state.Options,
            ItemValueSelected: Number(event.target.value)
        };
        this.props.onSelectItemsPerPage(this.state.ItemValueSelected);
    }
    bindItems() {
        return (this.state.Options.map((option, i) => {
            return React.createElement("option", { key: i, value: option.toString() }, option);
        }));
    }
    render() {
        return (React.createElement("div", { className: "dataTables_length", id: this.props.Id },
            React.createElement("label", null,
                "Hi\u1EC3n th\u1ECB \u00A0",
                React.createElement("select", { id: this.props.Id, onChange: event => this.onSelect(event), value: this.props.SelectedValue, "aria-controls": "DataTables_Table_0", className: "form-control input-sm" }, this.bindItems()))));
    }
}
//# sourceMappingURL=items-per-page.js.map