'use strict';

class EventListener {

  constructor(global) {
    this.window = global;

    this.messageHandlers = {};
    this.registerMessageHandler(require('./alert'));
    this.registerMessageHandler(require('./confirm'));
    this.registerMessageHandler(require('./enable_button'));
    this.registerMessageHandler(require('./modal'));
    this.registerMessageHandler(require('./modal_close'));
    this.registerMessageHandler(require('./navigate'));
    this.registerMessageHandler(require('./proxy'));
    this.registerMessageHandler(require('./refresh'));
    this.registerMessageHandler(require('./resize'));
    this.registerMessageHandler(require('./unload_init'));
    this.registerMessageHandler(require('./unload_reset'));

    this.window.addEventListener('message', (e) => {
      var message = e.data;

      if (typeof message === 'string') {
        console.log(message);
        try {
          message = JSON.parse(message);
          if (this.messageHandlers[message.event]) {
            this.messageHandlers[message.event].handleMessage(message);
          } else {
            console.warn('Unknown message ' + message.event);
          }
        }
        catch (e) {
          console.warn('Failed to decode JSON message.');
          console.warn('Message was:', message);
        }
      } else {
        console.warn([
          'Non-JSON integration messages are deprecated.',
          'Use emarsys-integration-client instead to send messages to Emarsys B2CC.'
        ].join(' '));
        console.warn('Message was:', message);
      }
    });

  }

  registerMessageHandler(MessageHandlerClass) {
    var instance = new MessageHandlerClass(this.window);
    this.messageHandlers[instance.MESSAGE_EVENT] = instance;
  }

}

module.exports = EventListener;
