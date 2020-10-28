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

  handleMessage(message) {
    return this.navigate(message)
      .then(success => this._responseToService(message.data.eventId, success, message.source.integration_instance_id));
  }

  navigate(message) {
    const url = getFullUrlByTarget({
      sessionId: this.window.Emarsys.config.session_id,
      target: message.data.target,
      params: message.data.params
    });

    if (this.window.Emarsys.integration.unload.initialized) {
      let promise = this.window.Emarsys.integration.dialog.confirmNavigation(
        url,
        this.getFakeConfirmMessage(message));

      return promise.then(() => true).fail(() => false);
    } else {
      this.window.location.href = url;
      return this.window.$.Deferred().resolve(true).promise(); // eslint-disable-line new-cap
    }
  }

  _responseToService(eventId, success, integrationInstanceId) {
    this.transmitter.messageToService(
        'navigate:response',
        { id: eventId, success: success },
        integrationInstanceId
    );
  }

}

module.exports = MessageHandlerNavigate;
