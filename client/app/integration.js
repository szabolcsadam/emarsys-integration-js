'use strict';

const _extend = require('lodash/extend');

const Receiver = require('emarsys-integration-client').comm.Receiver;
const AlertApi = require('emarsys-integration-client').api.Alert;
const Transmitter = require('./comm/transmitter');
const DialogApi = require('./service/dialog_api');
const DialogFactory = require('./service/dialog_factory');
const connect = require('./connect');
const getFullUrlByTarget = require('./message_handler/get_full_url_by_target');
const MessageHandlerNavigate = require('./message_handler/navigate');
const messageHandlers = [
  require('./message_handler/alert'),
  require('./message_handler/confirm'),
  require('./message_handler/enable_button'),
  require('./message_handler/fit'),
  require('./message_handler/get_url'),
  require('./message_handler/intercom_track_event'),
  require('./message_handler/modal'),
  require('./message_handler/modal_close'),
  require('./message_handler/navigate'),
  require('./message_handler/proxy'),
  require('./message_handler/refresh'),
  require('./message_handler/resize'),
  require('./message_handler/track'),
  require('./message_handler/update_hash'),
  require('./message_handler/unload_init'),
  require('./message_handler/unload_reset')
];

window.Emarsys = window.Emarsys || (window.SUITE ? _extend(true, {}, window.SUITE) : {});
window.Emarsys.config = window.Emarsys.config || (window.SUITE.config ? _extend(true, {}, window.SUITE.config) : {});

let transmitter = new Transmitter({
  global: window,
  integrationId: 'EMARSYS',
  integrationInstanceId: 'EMARSYS'
});
let receiver = new Receiver(window);

window.Emarsys.integration = {
  messageToEmarsys: transmitter.messageToEmarsys.bind(transmitter),
  messageToService: transmitter.messageToService.bind(transmitter),
  addMessageHandler: receiver.addMessageHandler.bind(receiver),
  alert: AlertApi.create(transmitter),
  dialog: new DialogApi(transmitter, DialogFactory.create()),
  getFullUrlByTarget: ({ target, params }) => getFullUrlByTarget({
    sessionId: window.Emarsys.config.session_id,
    target,
    params
  }),
  navigate: (messageData) => {
    let messageHandler = new MessageHandlerNavigate(window, null);
    return messageHandler.navigate({ data: messageData });
  },
  unload: {
    initialized: false
  }
};

messageHandlers.forEach(function(MessageHandlerClass) {
  let messageHandler = new MessageHandlerClass(window, transmitter);
  receiver.addMessageHandler(messageHandler.MESSAGE_EVENT, messageHandler.handleMessage.bind(messageHandler));
});

connect(window);
