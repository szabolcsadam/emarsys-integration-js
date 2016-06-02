'use strict';

const AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerTrack extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'track';
  }

  handleMessage(message) {
    if (!this.window.analytics || !this.window.analytics.request) {
      return false;
    }

    this.window.analytics.request('send', message.data);
  }

}

module.exports = MessageHandlerTrack;
