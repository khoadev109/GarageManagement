import React from "react";
import "moment/locale/it";
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils, { formatDate, parseDate } from "react-day-picker/moment";

interface DayPickerParameter {
    name: string;
    value: any;
    labelText?: string;
    isRequired?: boolean;
    dayChangeEvent(daySelected: Date): void;
}

export const DayPicker = (props: DayPickerParameter) => {
    return (
        <DayPickerInput name={props.name} value={props.value}
                        onDayChange={this.dayChangeEvent}
                        formatDate={formatDate} parseDate={parseDate}
                        dayPickerProps=
                        {{
                            locale: "vi",
                            localeUtils: MomentLocaleUtils,
                        }}/>
    )
}

export const DayPickerWithLabelHorizontal = (props: DayPickerParameter) => {
    const labelClass = "col-sm-3 control-label" + (props.isRequired ? " required" : "");

    return (
        <div className="form-group">
            <label className={labelClass}>{props.labelText}</label>
            <div className="col-sm-9">
                <DayPickerInput name={props.name} value={props.value} 
                                dayChangeEvent={props.dayChangeEvent} />
            </div>
        </div>
    )
}
