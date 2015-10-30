'use strict';

var extend = require('extend');

var Receiver = require('emarsys-integration-client').comm.Receiver;
var AlertApi = require('emarsys-integration-client').api.Alert;
var Transmitter = require('./comm/transmitter');
var DialogApi = require('./service/dialog_api');
var messageHandlers = [
  require('./message_handler/alert'),
  require('./message_handler/confirm'),
  require('./message_handler/enable_button'),
  require('./message_handler/modal'),
  require('./message_handler/modal_close'),
  require('./message_handler/navigate'),
  require('./message_handler/proxy'),
  require('./message_handler/refresh'),
  require('./message_handler/resize'),
  require('./message_handler/unload_init'),
  require('./message_handler/unload_reset')
];

(function(global) {
  global.Emarsys = global.Emarsys || (global.SUITE ? extend(true, {}, global.SUITE) : {});
  global.Emarsys.config = global.Emarsys.config || (global.SUITE.config ? extend(true, {}, global.SUITE.config) : {});

  var transmitter = new Transmitter({
    global: global,
    integrationId: 'EMARSYS',
    integrationInstanceId: 'EMARSYS'
  });
  var receiver = new Receiver(global);

  global.Emarsys.integration = {
    messageToService: transmitter.messageToService.bind(transmitter),
    addMessageHandler: receiver.addMessageHandler.bind(receiver),
    alert: AlertApi.create(transmitter),
    dialog: new DialogApi(transmitter),
    unload: {
      initialized: false
    }
  };

  messageHandlers.forEach(function(MessageHandlerClass) {
    var messageHandler = new MessageHandlerClass(global);
    receiver.addMessageHandler(messageHandler.MESSAGE_EVENT, messageHandler.handleMessage.bind(messageHandler));
  });
})(window);
