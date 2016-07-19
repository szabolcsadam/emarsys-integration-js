'use strict';

const AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerUpdateHash extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'update_hash';
  }

  handleMessage(message) {
    this.window.location.hash = message.data.hash;
  }

}

module.exports = MessageHandlerUpdateHash;
