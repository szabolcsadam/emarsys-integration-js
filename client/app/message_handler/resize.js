'use strict';

const AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerResize extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'resize';
  }

  handleMessage(message) {
    const height = parseInt(message.data.height);
    let $iframe = $(this.getIntegrationIframe(message.source.integration_instance_id));

    if (height) {
      $iframe
        .height(height)
        .parent()
        .height(height);
    }
  }

}

module.exports = MessageHandlerResize;
