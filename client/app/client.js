'use strict';

const ClientApi = require('emarsys-integration-client');

(function() {
  window.Emarsys = window.Emarsys || {};
  window.Emarsys.integration = {
    init: function(options) {
      window.Emarsys.integration = ClientApi.init(options);
    }
  };
})();
