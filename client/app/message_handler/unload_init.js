'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerUnloadInit extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'unload:init';
  }

  handleMessage(message) {
    var eventNamespace = 'confirm_navigation_' + message.source.integration_instance_id;
    var fakeConfirmMessage = this.getFakeConfirmMessage(message);

    $(this.window).off('beforeunload.' + eventNamespace);
    $(this.window).on('beforeunload.' + eventNamespace, function() {
      return fakeConfirmMessage.data.body;
    });

    $(message.data.selector)
      .off('click.' + eventNamespace)
      .on('click.' + eventNamespace, 'a[href][target!="_blank"]:not([onclick])', (event) => {
        if (event.ctrlKey || event.metaKey || event.which === 2 || !event.target.hostname) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        this.window.Emarsys.integration.dialog.confirmNavigation(event.target.href, fakeConfirmMessage);
      });

    this.window.Emarsys.integration.unload.initialized = true;
  }

}

module.exports = MessageHandlerUnloadInit;
