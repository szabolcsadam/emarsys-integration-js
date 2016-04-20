'use strict';

const AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerUnloadReset extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'unload:reset';
  }

  handleMessage(message) {
    const eventNamespace = 'confirm_navigation_' + message.source.integration_instance_id;

    $(this.window).off('beforeunload.' + eventNamespace);
    $(message.data.selector).off('click.' + eventNamespace);

    this.window.Emarsys.integration.unload.initialized = false;
  }

}

module.exports = MessageHandlerUnloadReset;
