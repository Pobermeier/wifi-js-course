class MVCEvent {
  constructor(sender) {
    this._sender = sender;
    this._listeners = [];
  }

  attach(listener) {
    this._listeners.push(listener);
  }

  notify(args) {
    for (let i in this._listeners) {
      this._listeners[i](this._sender, args);
    }
  }
}
