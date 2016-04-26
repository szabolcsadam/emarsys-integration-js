'use strict';

const AbstractOpenable = require('../openable/aopenable');

class AbstractInsertable extends AbstractOpenable {

  static get ceCallbackPattern() { return /ce[a-zA-Z]+Callback\d+/; }

  open(data) {
    this._clearAllGlobalCallbacks();

    this._generateInsertCallbackName();
    this.Window.createCallback(
      this.insertCallbackName,
      this._insertCallback.bind(this, data.source.integration_instance_id),
      this
    );

    if (this.EVENT_CHANGE) {
      this._generateChangeCallbackName();
      this.Window.createCallback(
        this.changeCallbackName,
        this._changeCallback.bind(this, data.source.integration_instance_id),
        this
      );
    }

    super.open(data); // eslint-disable-line security/detect-non-literal-fs-filename
  }

  _clearAllGlobalCallbacks() {
    for (let globalMember in this.Window.global) {
      if (globalMember.toString().match(AbstractInsertable.ceCallbackPattern)) {
        try {
          delete this.Window.global[globalMember];
        } catch (event) {
          this.Window.global[globalMember] = null;
        }
      }
    }
  }

  _insertCallback(integrationInstanceId) {
    let args = Array.prototype.splice.call(arguments, 1);
    let insertData = this._getInsertMessage.apply(this, args);

    this.Window.global.Emarsys.integration.messageToService(
      this._prepareEventName(this.EVENT_INSERT),
      insertData,
      integrationInstanceId);
  }

  _changeCallback(integrationInstanceId) {
    this.Window.global.Emarsys.integration.messageToService(
      this._prepareEventName(this.EVENT_CHANGE),
      false,
      integrationInstanceId);
  }

  _getInsertMessage() {
    throw new Error('This method should be implemented.');
  }

  _generateInsertCallbackName() {
    let callbackName = this._generateCallbackName('Insert');
    this._validateCallbackName(callbackName);
    this.insertCallbackName = callbackName;
  }

  _generateChangeCallbackName() {
    let callbackName = this._generateCallbackName('Change');
    this._validateCallbackName(callbackName);
    this.changeCallbackName = callbackName;
  }

  _validateCallbackName(callbackName) {
    if (!callbackName.match(AbstractInsertable.ceCallbackPattern)) {
      throw new Error('Invalid callback name!');
    }
  }

  _generateCallbackName(name) {
    return 'ce' + name + 'Callback' + this._generateId();
  }

  _generateId() {
    return parseInt(Math.random() * 1000, 10);
  }

  _prepareVariable(variable) {
    return this.CampaignAPI.persPrefix + variable + this.CampaignAPI.persSuffix;
  }
}

module.exports = AbstractInsertable;
