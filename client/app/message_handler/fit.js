'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerFit extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'fit';
  }

  handleMessage(message) {
    var $iframe = $(this.getIntegrationIframe(message.source.integration_instance_id));

    var height = $iframe.height() + (document.body.offsetHeight - document.body.scrollHeight);

    $iframe
      .height(height)
      .parent()
      .height(height);
  }

}

module.exports = MessageHandlerFit;
