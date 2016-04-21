'use strict';

module.exports = function(global) {
  let ConnectCoreAPI = require('./core').create(global.SUITE, global);

  ConnectCoreAPI.personalization = require('./insertable/personalization').create(global.SUITE, global);
  ConnectCoreAPI.conditional = require('./insertable/conditional_text').create(global.SUITE, global);
  ConnectCoreAPI.mediaDb = require('./insertable/media_db').create(global.SUITE, global);
  ConnectCoreAPI.fullPreview = require('./openable/full_preview').create(global.SUITE, global);

  global.SUITE.integration.contentEditor = ConnectCoreAPI;
};
