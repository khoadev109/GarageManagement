export class Branch {
    constructor(public Id: string, public Name: string, public ShortName: string) {}
}

export class CustomerType {
    constructor(public Id: string, public Name: string) { }
}

export class Employee {
    constructor(public Id: string, public Name: string) { }
}

export class Accessary {
    constructor(public Id: string, public Name: string, public Price: number, public UnitId: number, public UnitName: string) { }
}

export class Service {
    constructor(public Id: string, public Name: string, public Cost: number, public UnitId: number, public UnitName: string) { }
}
