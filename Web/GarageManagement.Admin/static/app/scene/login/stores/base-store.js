import { EventEmitter } from 'events';
import { Dispatcher } from 'flux';
export default class BaseStore extends EventEmitter {
    constructor(appDispatcher, _dispatchToken) {
        super();
        this.appDispatcher = appDispatcher;
        this._dispatchToken = _dispatchToken;
        this.appDispatcher = new Dispatcher();
    }
    subscribe(actionSubscribe) {
        this._dispatchToken = this.appDispatcher.register(actionSubscribe());
    }
    get dispatchToken() {
        return this._dispatchToken;
    }
    emitChange() {
        this.emit('CHANGE');
    }
    addChangeListener(cb) {
        this.on('CHANGE', cb);
    }
    removeChangeListener(cb) {
        this.removeListener('CHANGE', cb);
    }
}
//# sourceMappingURL=base-store.js.map