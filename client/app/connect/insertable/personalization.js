'use strict';

const AbstractInsertable = require('./ainsertable');

class InsertablePersonalization extends AbstractInsertable {

  get EVENT_NAMESPACE() { return 'personalization'; }
  get EVENT_OPEN() { return 'open'; }
  get EVENT_INSERT() { return 'insertVariable'; }

  _openDialog() {
    this.Window.callMethod(
      'openDialog',
      'personalizer.php?session_id=$SID$&camp=$CAMPAIGNID$&func=' + this.insertCallbackName,
      300,
      350
    );
  }

  _getInsertMessage(variable) {
    return {
      variable: this._prepareVariable(variable)
    };
  }

  static create(SuiteAPI, global) {
    return new InsertablePersonalization(SuiteAPI, global);
  }

}

module.exports = InsertablePersonalization;
