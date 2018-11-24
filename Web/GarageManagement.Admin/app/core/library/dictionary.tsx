module Dictionary {
    export interface IKeyedCollection<T> {
        add(key: string, value: T) : void;
        remove(key: string): T;
        removeAll(): void;
        containsKey(key: string): boolean;
        count(): number;
        getItem(key: string): T;
        getFirstKey(): string;
        getFirstValue(): any;
        getKeys(): string[];
        keysExcept(exceptKey: string): string[];
        values(): T[];
        setValue(key: string, value: T): T;
        findByValues(value: T): T[]
    }

    export interface ItemCollection<T> {
        key: string;
        value: T;
    }
    
    export class KeyedCollection<T> implements IKeyedCollection<T> {
        private _count: number = 0;
        private _items: { [index: string]: T } = {};

        constructor(collection?: Array<ItemCollection<T>>) {
            collection.forEach(x => {
                this.add(x.key, x.value);
            });
        }
        
        public containsKey(key: string): boolean {
            return this._items.hasOwnProperty(key);
        }
     
        public count(): number {
            return this._count;
        }
     
        public add(key: string, value: T) {
            if (!this._items.hasOwnProperty(key))
                 this._count++;
     
            this._items[key] = value;
        }
     
        public remove(key: string): T {
            let value = this._items[key];
            delete this._items[key];
            this._count--;
            return value;
        }

        public removeAll(): void {
            this._items = {};
        }
        
        public getItem(key: string): T {
            return this._items[key];
        }

        public setValue(key: string, value: T): T {
            return this._items[key] = value;
        }

        public getFirstKey(): string {
            return this.getKeys()[0];
        }

        public getFirstValue(): any {
            let value = this.getItem(this.getFirstKey());
            return value;
        }
        
        public getKeys(): string[] {
            let keySet = [];
     
            for (let property in this._items) {
                if (this._items.hasOwnProperty(property)) {
                    keySet.push(property);
                }
            }

            return keySet;
        }

        public keysExcept(exceptKey: string): string[] {
            var keySet: string[] = [];
            var itemsWithoutExceptKey: { [index: string]: T } = this._items;

            if (itemsWithoutExceptKey.hasOwnProperty(exceptKey))
                delete itemsWithoutExceptKey[exceptKey];
     
            for (var prop in itemsWithoutExceptKey)
                keySet.push(prop);
     
            return keySet;
        }
        
        public values(): T[] {
            var values: T[] = [];
     
            for (var prop in this._items) {
                if (this._items.hasOwnProperty(prop)) {
                    values.push(this._items[prop]);
                }
            }
     
            return values;
        }

        public findByValues(value: T): T[] {
            var values: T[] = [];
           
            for (var prop in this._items) {
                if (this._items.hasOwnProperty(prop)) {
                    values.push(this._items[prop]);
                }
            }
     
            var valuesFindBy = values.filter(item => item == value);
            return valuesFindBy;
        }
    }
}

export default Dictionary;
