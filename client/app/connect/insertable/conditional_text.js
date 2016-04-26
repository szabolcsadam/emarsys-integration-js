'use strict';

const AbstractInsertable = require('./ainsertable');

class InsertableConditionalText extends AbstractInsertable {

  get EVENT_NAMESPACE() { return 'conditional'; }
  get EVENT_OPEN() { return 'open'; }
  get EVENT_INSERT() { return 'insertCondition'; }
  get EVENT_CHANGE() { return 'changeConditionals'; }

  _openDialog() {
    this.Window.callMethod(
      'openDialog',
      this._getUrl(),
      640,
      480
    );
  }

  _getUrl() {
    return [
      'edit_cond_text.php?session_id=$SID$&camp=$CAMPAIGNID$&func=',
      this.insertCallbackName,
      '&funcSave=',
      this.changeCallbackName
    ].join('');
  }

  _getInsertMessage(variable) {
    return {
      variable: this._prepareVariable(variable)
    };
  }

  static create(SuiteAPI, global) {
    return new InsertableConditionalText(SuiteAPI, global);
  }

}

module.exports = InsertableConditionalText;
