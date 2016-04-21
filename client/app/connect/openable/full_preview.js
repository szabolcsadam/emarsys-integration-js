'use strict';

const AbstractOpenable = require('./aopenable');

class FullPreview extends AbstractOpenable {

  get EVENT_NAMESPACE() { return 'preview'; }
  get EVENT_OPEN() { return 'open'; }

  _openDialog() {
    this.Window.callMethod('openDialog', this._getUrl(), 1024, 768);
  }

  _getUrl() {
    return 'preview_fs.php?session_id=$SID$&camp_id=$CAMPAIGNID$&show=html&force_mobile_preview=1';
  }

  static create(SuiteAPI, global) {
    return new FullPreview(SuiteAPI, global);
  }

}

module.exports = FullPreview;
