'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerEnableButton extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'enable_button';
  }

  handleMessage(message) {
    this.window.$(message.data.selection)
      .removeClass('e-btn-disabled');
  }

}

module.exports = MessageHandlerEnableButton;
