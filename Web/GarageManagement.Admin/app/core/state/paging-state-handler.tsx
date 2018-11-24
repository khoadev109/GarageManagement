import { SortDirection } from "../component/base-paging-component";

export function initPagingState<S>(defaultSortName = "Name") {
    this.state = {
        SelectedIdOnRow: "",
        Request: {
            SearchTerm: "",
            SortName: defaultSortName,
            PageIndex: 1,
            PageSize: this.pageSize,
            SortDirection: SortDirection.Asc
        },
        Response: {
            CurrentPage: 0,
            TotalRows: 0,
            TotalPages: 0,
            HasNext: false,
            HasPrevious: false,
            DTOs: new Array<S>()
        },
        Navigation: {
            FromPage: 1,
            ToPage: 5
        }
    };
}
