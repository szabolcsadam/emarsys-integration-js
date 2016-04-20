'use strict';

const ClientApi = require('emarsys-integration-client');

(function(global) {
  global.Emarsys = global.Emarsys || {};
  global.Emarsys.integration = {
    init: function(options) {
      global.Emarsys.integration = ClientApi.init(options);
    }
  };
})(window);
