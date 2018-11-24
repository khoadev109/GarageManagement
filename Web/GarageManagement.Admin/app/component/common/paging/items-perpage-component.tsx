import * as React from "react";

interface IPageSizePropsCallBack {
    onSelectItemsPerPage: (numberItems: number) => void
}

interface IPageSizeProps extends IPageSizePropsCallBack {
    Id: string,
    Name?: string,
    SelectedValue: number
}

interface IPageSizeState {
    Options: number[],
    ItemValueSelected: number
}

export class ItemsPerPage extends React.Component<IPageSizeProps, IPageSizeState> {
    constructor (props: IPageSizeProps, context: IPageSizeState) {
        super(props);
        this.onSelect = this.onSelect.bind(this);

        this.state = { 
            Options: [ 10, 25, 50, 100 ], 
            ItemValueSelected: 10 
        };
    }

    onSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        this.state = { 
            Options: this.state.Options, 
            ItemValueSelected: Number(event.target.value)
        };
        this.props.onSelectItemsPerPage(this.state.ItemValueSelected);
    }
    
    bindItems() {
        return (
            this.state.Options.map((option, i) => { 
                return <option key={i} value={option.toString()}>{option}</option>
            })
        )
    }
    
    render () {
        return (
            <div className="dataTables_length" id={this.props.Id}>
                <label>
                    Hiển thị &nbsp;
                    <select id={this.props.Id} 
                            onChange={event => this.onSelect(event)} 
                            value={this.props.SelectedValue}
                            aria-controls="DataTables_Table_0" 
                            className="form-control input-sm">
                        { this.bindItems() }
                    </select>
                </label>
            </div>
        );
    }
}
