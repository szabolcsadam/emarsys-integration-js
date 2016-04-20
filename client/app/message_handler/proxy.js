'use strict';

const AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerProxy extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'proxy';
  }

  handleMessage(message) {
    message.data.envelope = message.data.envelope || {};
    this.window.Emarsys.integration.messageToService(
      message.data.event,
      message.data.envelope,
      message.data.integrationInstanceId);
  }

}

module.exports = MessageHandlerProxy;
