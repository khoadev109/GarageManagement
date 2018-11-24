module GeneralState {
    export class Branch {
        constructor(public Id: string, public Name: string, public ShortName: string) {}
    }
    
    export class CustomerType {
        constructor(public Id: string, public Name: string) { }
    }
    
    export class Manufacturer {
        constructor(public Id: number, public Name: string) { }
    }
    
    export class Style {
        constructor(public Id: number, public Name: string) { }
    }
    
    export class Model {
        constructor(public Id: number, public Name: string) { }
    }
    
    export class Year {
        constructor(public Id: number, public Name: string) { }
    }
    
    export class Employee {
        constructor(public Id: string, public Name: string) { }
    }
    
    export class Accessary {
        constructor(public Id: string, public Name: string, public Price: number, public UnitId: number, public UnitName: string) { }
    }
    
    export class AccessaryUnit {
        constructor(public Id: number, public Name: string) { }
    }

    export class Category {
        constructor(public Id: number, public Name: string, public ParentId?: number, public ParentName?: string) { }
    }
    
    export class Service {
        constructor(public Id: string, public Name: string, public Cost: number, public UnitId: number, public UnitName: string) { }
    }
    
    export class ServiceType {
        constructor(public Id: number, public Name: string) {}
    }

    export class ServiceUnit {
        constructor(public Id: number, public Name: string) {}
    }
    
}

export default GeneralState;
