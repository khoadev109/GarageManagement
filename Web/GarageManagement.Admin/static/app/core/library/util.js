var app;
(function (app) {
    var miscelanious;
    (function (miscelanious) {
        class Utils {
            // generates a new Universally unique identify (UUID) 
            // the UUID is used to identify each of the tasks
            static uuid() {
                /*jshint bitwise:false */
                var i, random;
                var uuid = '';
                for (i = 0; i < 32; i++) {
                    random = Math.random() * 16 | 0;
                    if (i === 8 || i === 12 || i === 16 || i === 20) {
                        uuid += '-';
                    }
                    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
                        .toString(16);
                }
                return uuid;
            }
            // adds 's' to the end of a given world when count > 1
            static pluralize(count, word) {
                return count === 1 ? word : word + 's';
            }
            // stores data using the localStorage API
            static store(namespace, data) {
                if (data) {
                    return localStorage.setItem(namespace, JSON.stringify(data));
                }
                var store = localStorage.getItem(namespace);
                return (store && JSON.parse(store)) || [];
            }
            // just a helper for inheritance
            static extend(...objs) {
                var newObj = {};
                for (var i = 0; i < objs.length; i++) {
                    var obj = objs[i];
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            newObj[key] = obj[key];
                        }
                    }
                }
                return newObj;
            }
        }
        miscelanious.Utils = Utils;
    })(miscelanious = app.miscelanious || (app.miscelanious = {}));
})(app || (app = {}));
//# sourceMappingURL=util.js.map