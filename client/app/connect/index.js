'use strict';

module.exports = function(global) {
  let ConnectCoreAPI = require('./core').create(global.Emarsys, global);

  ConnectCoreAPI.personalization = require('./insertable/personalization').create(global.Emarsys, global);
  ConnectCoreAPI.conditional = require('./insertable/conditional_text').create(global.Emarsys, global);
  ConnectCoreAPI.mediaDb = require('./insertable/media_db').create(global.Emarsys, global);
  ConnectCoreAPI.fullPreview = require('./openable/full_preview').create(global.Emarsys, global);

  global.Emarsys.integration.contentEditor = ConnectCoreAPI;
  if (global.SUITE && global.SUITE.integration) {
    global.SUITE.integration.contentEditor = ConnectCoreAPI;
  }
};
