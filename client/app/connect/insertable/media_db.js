'use strict';

const AbstractInsertable = require('./ainsertable');

class InsertableMediaDb extends AbstractInsertable {

  get EVENT_NAMESPACE() { return 'mediaDb'; }
  get EVENT_OPEN() { return 'open'; }
  get EVENT_INSERT() { return 'insertImage'; }

  _openDialog() {
    let openMediaDb = this.Window.getGlobalMethod('OpenMediaDBDialog');
    if (openMediaDb) {
      openMediaDb(this.ConfigAPI.session_id, null, this.insertCallbackName, null, this.CampaignAPI.id, true);
      return;
    }

    let mediaDB = this.Window.getGlobal('mediaDB') || {};
    let mediaDBAPI = mediaDB.api;

    if (!mediaDBAPI) {
      return;
    }

    mediaDBAPI.once('fileSelected', this.Window.getGlobalMethod(this.callbackName));
    mediaDBAPI.openWithFileSelection();
  }

  _getInsertMessage(id, originalFilename, relativePath, basePath) {
    if (isNaN(id)) {
      return {
        originalName: id.originalFilename,
        imageUrl: id.basePath + id.relativePath
      };
    }

    return {
      originalName: originalFilename,
      imageUrl: basePath + relativePath
    };
  }

  static create(SuiteAPI, global) {
    return new InsertableMediaDb(SuiteAPI, global);
  }

}

module.exports = InsertableMediaDb;
