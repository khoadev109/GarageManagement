export var Dictionary;
(function (Dictionary) {
    class KeyedCollection {
        constructor() {
            this.items = {};
            this.count = 0;
        }
        ContainsKey(key) {
            return this.items.hasOwnProperty(key);
        }
        Count() {
            return this.count;
        }
        Add(key, value) {
            if (!this.items.hasOwnProperty(key))
                this.count++;
            this.items[key] = value;
        }
        Remove(key) {
            var val = this.items[key];
            delete this.items[key];
            this.count--;
            return val;
        }
        Item(key) {
            return this.items[key];
        }
        SetValue(key, value) {
            return this.items[key] = value;
        }
        FirstKey() {
            var keys = this.Keys();
            return keys[0];
        }
        FirstValue() {
            var value = this.Item(this.FirstKey());
            return value;
        }
        Keys() {
            var keySet = [];
            for (var prop in this.items) {
                if (this.items.hasOwnProperty(prop)) {
                    keySet.push(prop);
                }
            }
            return keySet;
        }
        Values() {
            var values = [];
            for (var prop in this.items) {
                if (this.items.hasOwnProperty(prop)) {
                    values.push(this.items[prop]);
                }
            }
            return values;
        }
        FindByValues(value) {
            var values = [];
            for (var prop in this.items) {
                if (this.items.hasOwnProperty(prop)) {
                    values.push(this.items[prop]);
                }
            }
            var valuesFindBy = values.filter(item => item == value);
            return valuesFindBy;
        }
    }
    Dictionary.KeyedCollection = KeyedCollection;
})(Dictionary || (Dictionary = {}));
//# sourceMappingURL=dictionary.js.map