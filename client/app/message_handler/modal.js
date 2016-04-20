'use strict';

const AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerModal extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'modal';
  }

  handleMessage(message) {
    if (message.data.src.match(/^\/{1}[^\/]+/)) {
      message.data.src = '//' + this.window.location.host + message.data.src;
      message.data.src = message.data.src.replace('{session_id}', this.window.Emarsys.config.session_id);
    }

    this.window.Emarsys.integration.dialog.modal(message);
  }

}

module.exports = MessageHandlerModal;
