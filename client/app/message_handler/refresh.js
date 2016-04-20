'use strict';

const AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerRefresh extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'refresh';
  }

  handleMessage() {
    this.window.location.reload();
  }

}

module.exports = MessageHandlerRefresh;
