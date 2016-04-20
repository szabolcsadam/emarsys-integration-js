'use strict';

const AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerModalClose extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'modal:close';
  }

  handleMessage() {
    this.window.Emarsys.integration.dialog.close();
  }

}

module.exports = MessageHandlerModalClose;
