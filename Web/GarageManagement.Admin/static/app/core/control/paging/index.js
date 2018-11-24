import React from "react";
import { Navigation } from "../../../component/common/paging/navigation";
export class NavigationSetting {
    constructor(setting) {
        this.setting = setting;
    }
    setGroupPageIndexForNextNavigation(state) {
        if (state.Response.TotalPages % this.setting.NumberPageRangeDisplay == 0) {
            let groupNavigationSize = Math.floor(state.Response.TotalPages / this.setting.NumberPageRangeDisplay);
            for (let index = 1; index <= groupNavigationSize; index++) {
                let toPageRange = index * this.setting.NumberPageRangeDisplay + index - 1;
                if (state.Request.PageIndex > toPageRange &&
                    state.Navigation.ToPage < state.Response.TotalPages) {
                    state.Navigation.FromPage = state.Request.PageIndex;
                    state.Navigation.ToPage = state.Request.PageIndex + this.setting.NumberPageRangeDisplay - 1;
                }
            }
        }
        else {
            if (state.Request.PageIndex > this.setting.NumberPageRangeDisplay) {
                state.Navigation.FromPage = state.Request.PageIndex - (this.setting.NumberPageRangeDisplay - 1);
                state.Navigation.ToPage = state.Request.PageIndex;
            }
        }
    }
    setGroupPageIndexForPrevNavigation(state) {
        if (state.Request.PageIndex <= this.setting.NumberPageRangeDisplay) {
            state.Navigation.FromPage = 1;
            state.Navigation.ToPage = this.setting.NumberPageRangeDisplay;
        }
        else if (state.Request.PageIndex > 1) {
            state.Navigation.FromPage = state.Request.PageIndex - (this.setting.NumberPageRangeDisplay - 1);
            state.Navigation.ToPage = state.Request.PageIndex;
        }
    }
    showNavigationButtons(state, isSelectItemsPerPage, onLoadDataByNextNavigation, onLoadDataByPrevNavigation, onLoadDataByPageSelected) {
        if (isSelectItemsPerPage) {
            if (this.setting.NumberPageRangeDisplay < state.Response.TotalPages)
                state.Navigation.ToPage = this.setting.NumberPageRangeDisplay;
            else
                state.Navigation.ToPage = state.Response.TotalPages;
        }
        return (React.createElement(Navigation, { Id: this.setting.NavigationId, CurrentPage: state.Response.CurrentPage, HasNext: state.Response.HasNext, HasPrevious: state.Response.HasPrevious, PageRange: state.Navigation, onLoadByNextNavigation: () => onLoadDataByNextNavigation(), onLoadByPrevNavigation: () => onLoadDataByPrevNavigation(), onLoadByPageSelectedNavigation: (pageIndex) => onLoadDataByPageSelected(pageIndex) }));
    }
}
//# sourceMappingURL=index.js.map