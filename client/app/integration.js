'use strict';

var extend = require('extend');

var EmarsysApi = require('./service/emarsys_api');
var DialogApi = require('./service/dialog_api');
var EventListener = require('./message_handler/listener');

(function(global) {
  global.Emarsys = global.Emarsys || (global.SUITE ? extend(true, {}, global.SUITE) : {});
  global.Emarsys.config = global.Emarsys.config || (global.SUITE.config ? extend(true, {}, global.SUITE.config) : {});
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
