'use strict';

module.exports = function(global) {
  let ConnectCoreAPI = require('./core').create(global.SUITE, window);

  ConnectCoreAPI.personalization = require('./insertable/personalization').create(global.SUITE, window);
  ConnectCoreAPI.conditional = require('./insertable/conditional_text').create(global.SUITE, window);
  ConnectCoreAPI.mediaDb = require('./insertable/media_db').create(global.SUITE, window);
  ConnectCoreAPI.fullPreview = require('./openable/full_preview').create(global.SUITE, window);

  global.SUITE.integration.contentEditor = ConnectCoreAPI;
};
