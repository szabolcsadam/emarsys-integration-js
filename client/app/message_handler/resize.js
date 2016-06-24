'use strict';

const AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerResize extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'resize';
  }

  handleMessage(message) {
    let height = parseInt(message.data.height);
    let $iframe = $(this.getIntegrationIframe(message.source.integration_instance_id));
    let $toResize = $iframe.parent();

    if (height) {
      if ($iframe.parent().hasClass('e-dialog__content')) {
        $toResize = $iframe.parent().parent();
        height = height + 54;
      }
      $iframe.height(height);
      $toResize.height(height);
    }
  }

}

module.exports = MessageHandlerResize;
