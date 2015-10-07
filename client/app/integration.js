'use strict';

var EmarsysApi = require('./service/emarsys_api');
var DialogApi = require('./service/dialog_api');
var EventListener = require('./message_handler/listener');

(function(global) {
  global.Emarsys = global.Emarsys || {};
  global.Emarsys.integration = new EmarsysApi({
    global: global,
    integrationId: 'EMARSYS',
    integrationInstanceId: 'EMARSYS'
  });
  global.Emarsys.integration.dialog = new DialogApi(global.Emarsys.integration);

  new EventListener(global);
})(window);
