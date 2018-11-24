import { EventEmitter } from 'events';
import { Dispatcher } from 'flux';

export default class BaseStore extends EventEmitter {

  constructor(public appDispatcher: Dispatcher, public _dispatchToken: any) {
    super();
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
    this.on('CHANGE', cb)
  }

  removeChangeListener(cb) {
    this.removeListener('CHANGE', cb);
  }
}
