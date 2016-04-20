'use strict';

const AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerFit extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'fit';
  }

  handleMessage(message) {
    let $iframe = $(this.getIntegrationIframe(message.source.integration_instance_id));
    const height = $iframe.height() + (document.body.offsetHeight - document.body.scrollHeight);

    $iframe
      .height(height)
      .parent()
      .height(height);
  }

}

module.exports = MessageHandlerFit;
