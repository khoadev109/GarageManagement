export module CustomStyle {
    export const highlightSelectedDayStyle = `.DayPickerInput-Day--highlighted {
        background-color: orange;
        color: white;
    }`
    
    export function mergeStyle(inputStyles: Array<{}>) : {} {
        var mergedStyle = { fontSize: "inherit" };
        
        inputStyles.forEach(function(style, i) {
            mergedStyle = Object.assign(mergedStyle, style);
        });
        return mergedStyle;
    }
}
