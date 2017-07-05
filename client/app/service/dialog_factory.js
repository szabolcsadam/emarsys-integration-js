'use strict';

const Confirm = require('./components/confirm');
const Modal = require('./components/modal');

class DialogFactory {

  createConfirmDialog(global, message) {
    return new Confirm(global, message);
  }

  createModalDialog(global, message) {
    return new Modal(global, message);
  }

  static create() {
    return new DialogFactory();
  }

}

module.exports = DialogFactory;
