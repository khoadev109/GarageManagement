export interface ReduxMapping {
    mapStateToProps(state: any, ownProps?: any): any;
    mapDispatchToProps(dispatch: any, ownProps?: any): any;
    connectComponent(component: any): any;
}
