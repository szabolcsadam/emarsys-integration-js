'use strict';

class WrapperWindow {

  constructor(global) {
    this.global = global;
  }

  callMethod(methodName) {
    let args = Array.prototype.slice.call(arguments, 1);
    this.global[methodName].apply(this.global, args);
  }

  createCallback(name, callback, context) {
    this.global[name] = this._createOneTimeCallbackForName(callback, context);
  }

  getGlobalMethod(methodName) {
    return this.global[methodName];
  }

  getGlobal(name) {
    return this.global[name];
  }

  _createOneTimeCallbackForName(callback, context) {
    return function() { callback.apply(context, arguments); };
  }

  static create(global) {
    global = global || window;
    return new WrapperWindow(global);
  }

}

module.exports = WrapperWindow;
