import * as React from "react";

interface IRangeProps {
    FromItem: number,
    ToItem: number,
    TotalItems: number
}

export class DisplayingPageRange extends React.Component<IRangeProps> {
    constructor (props: IRangeProps) {
        super(props);
    }

    render () {
        return (
            <div className="dataTables_info" role="status" aria-live="polite">
                Hiển thị {this.props.FromItem} - {this.props.ToItem} trong {this.props.TotalItems}
            </div>
        );
    }
}