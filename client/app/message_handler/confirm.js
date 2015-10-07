'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerConfirm extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'confirm';
  }

  handleMessage(message) {
    this.window.Emarsys.integration.dialog.confirm(message);
  }

}

module.exports = MessageHandlerConfirm;
