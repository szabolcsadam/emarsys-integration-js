'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerUnloadReset extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'unload:reset';
  }

  handleMessage(message) {
    var eventNamespace = 'confirm_navigation_' + message.source.integration_instance_id;

    $(this.window).off('beforeunload.' + eventNamespace);
    $(message.data.selection).off('click.' + eventNamespace);
  }

}

module.exports = MessageHandlerUnloadReset;
