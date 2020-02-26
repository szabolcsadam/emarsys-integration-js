'use strict';

const AbstractMessageHandler = require('./abstract_message_handler');
const getFullUrlByTarget = require('./get_full_url_by_target');

class GetUrl extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'get_url';
  }

  constructor(global, transmitter) {
    super(global);

    this.transmitter = transmitter;
  }

  handleMessage(message) {
    try {
      const url = getFullUrlByTarget({
        sessionId: this.window.Emarsys.config.session_id,
        target: message.data.target,
        params: message.data.params
      });

      this.transmitter.messageToService(
        'get_url:response',
        { id: message.data.eventId, success: true, url: url },
        message.source.integration_instance_id
      );
    } catch (e) {
      this.transmitter.messageToService(
        'get_url:response',
        { id: message.data.eventId, success: false, error: e.message },
        message.source.integration_instance_id
      );
    }
  }
}

module.exports = GetUrl;
