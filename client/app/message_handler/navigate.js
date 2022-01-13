'use strict';

const AbstractMessageHandler = require('./abstract_message_handler');
const getFullUrlByTarget = require('./get_full_url_by_target');

class MessageHandlerNavigate extends AbstractMessageHandler {
  get MESSAGE_EVENT() {
    return 'navigate';
  }

  constructor(global, transmitter) {
    super(global);

    this.transmitter = transmitter;
  }

  handleMessage(message, event) {
    return this.navigate(message).then(success =>
      this.transmitter.respondToSender(
        'navigate:response',
        { id: message.data.eventId, success },
        event
      )
    );
  }

  navigate(message) {
    const url = getFullUrlByTarget({
      sessionId: this.window.Emarsys.config.session_id,
      target: message.data.target,
      params: message.data.params
    });

    if (this.window.Emarsys.integration.unload.initialized) {
      const promise = this.window.Emarsys.integration.dialog.confirmNavigation(
        url,
        this.getFakeConfirmMessage(message)
      );

      return promise.then(() => true).fail(() => false);
    } else {
      this.window.location.href = url;
      return this.window.$.Deferred().resolve(true).promise(); // eslint-disable-line new-cap
    }
  }
}

module.exports = MessageHandlerNavigate;
