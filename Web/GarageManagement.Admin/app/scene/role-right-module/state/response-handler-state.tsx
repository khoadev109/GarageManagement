import ToastHelper from "component/common-helper/toast-helper";

module StateResponse {
    export function savePermissionResponseState(dataResponse: any) {
        if (!dataResponse.Success) {
            ToastHelper.notifyWarning("Gặp sự cố!");
        }
    }

    export function setResponseStateUsers(dataResponse: any) {
        this.setState({ Users: dataResponse });
    }

    export function setResponseStateRoles(dataResponse: any) {
        this.setState({ Roles: dataResponse });
    }

    export function setResponseStateModules(dataResponse: any) {
        this.setState({ Modules: dataResponse });
    }

    export function setResponseStatePermissionByUser(dataResponse: any) {
        this.resetCheckedRightModule();
        this.state.DataResponse.RoleRightModules = dataResponse;
        this.setCheckboxByModuleUser();
    }

    export function setResponseStatePermissionByRole(dataResponse: any) {   
        this.resetCheckedRightModule();     
        this.state.DataResponse.RoleRightModules = dataResponse;
        this.setCheckboxByModuleRole();
    }

    export function resetCheckedRightModule(){
        this.state.Modules.forEach((module, i) => {             
            module.RightModules.forEach((right, i) => {                
                right.Value = false;
            });            
        });
    }

    export function getBinary(decimal: number) {
        var str_binary = decimal.toString(2);
        switch (str_binary.length) {
            case 1: str_binary = '0000' + str_binary;
                break;
            case 2: str_binary = '000' + str_binary;
                break;
            case 3: str_binary = '00' + str_binary;
                break;
            case 4: str_binary = '0' + str_binary;
                break;
        }
        return str_binary;
    }

    export function setCheckboxByModuleUser(){
        var data = this.state.DataResponse.RoleRightModules;
		var countList = data.length;
		for (var i = 0; i < countList; i++) {
			var item_Pos = data.find(function (d) { return d.ModuleId === data[i].ModuleId });

			var listPermissByUser = item_Pos.UserRights;
			var item_Emp = listPermissByUser.find(function (d) { return d.ModuleId === data[i].ModuleId });
			var binary = 0;
			if (item_Emp !== undefined) {
				binary = item_Emp.Value;
			}
			else binary = item_Pos.Value;
			let str_binary = this.getBinary(binary).toString();
			this.checkBinary(item_Pos.ModuleId, str_binary);
		}
    }

    export function setCheckboxByModuleRole(){
        var data = this.state.DataResponse.RoleRightModules;
		var countList = data.length;
		for (var i = 0; i < countList; i++) {
			var item_module = data.find(function (d) { return d.ModuleId === data[i].ModuleId });
			var str_binary = this.getBinary(data[i].Value);
			this.checkBinary(item_module.ModuleId, str_binary);
		}
    }

    export function checkBinary(moduleId: number, str_binary: string){
        if (str_binary[0] === '1') { 
            this.updateCheckedRightModule(moduleId, 1, true);
        }
        else {
            this.updateCheckedRightModule(moduleId, 1, false);
        }
		if (str_binary[1] === '1') {
            this.updateCheckedRightModule(moduleId, 2, true);
        }
        else{ 
            this.updateCheckedRightModule(moduleId, 2, false);
        }
		if (str_binary[2] === '1'){ 
            this.updateCheckedRightModule(moduleId, 3, true);
        }
        else {
            this.updateCheckedRightModule(moduleId, 3, false);
        }
		if (str_binary[3] === '1'){
            this.updateCheckedRightModule(moduleId, 4, true);
        }
        else {
            this.updateCheckedRightModule(moduleId, 4, false);
        }
		if (str_binary[4] === '1'){
            this.updateCheckedRightModule(moduleId, 5, true);
        }
        else {
            this.updateCheckedRightModule(moduleId, 5, false);
        }
    }

    export function updateCheckedRightModule(moduleId: number, rightId: number, value: boolean){        
        this.state.Modules.forEach((module, i) => { 
            if(module.Id == moduleId){
                module.RightModules.forEach((right, i) => {
                    if(right.Id == rightId)
                        right.Value = value;
                });
            }
        });
    }
}

export default StateResponse;
