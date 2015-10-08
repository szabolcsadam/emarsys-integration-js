'use strict';

var EmarsysApi = require('./service/emarsys_api');
var DialogApi = require('./service/dialog_api');
var EventListener = require('./message_handler/listener');

(function(global) {
  global.Emarsys = global.Emarsys || {};
  var emarsysApi = new EmarsysApi({
    global: global,
    integrationId: 'EMARSYS',
    integrationInstanceId: 'EMARSYS'
  });

  global.Emarsys.integration = {
    messageToService: emarsysApi.messageToService.bind(emarsysApi),
    dialog: new DialogApi(emarsysApi),
    unload: {
      initialized: false
    }
  };

  new EventListener(global);
})(window);
