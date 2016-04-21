'use strict';

const WrapperCampaign = require('../wrapper/campaign');
const WrapperConfig = require('../wrapper/config');
const WrapperWindow = require('../wrapper/window');

class AbstractOpenable {

  constructor(SuiteAPI, global) {
    this.SuiteAPI = SuiteAPI;
    this.global = global;
    this.CampaignAPI = WrapperCampaign.create(this.SuiteAPI, this.global);
    this.ConfigAPI = WrapperConfig.create(this.SuiteAPI, this.global);
    this.Window = WrapperWindow.create(this.global);

    this.global.Emarsys.integration.addMessageHandler(this._prepareEventName(this.EVENT_OPEN), this.open.bind(this));
  }

  open(message) {
    this._openDialog(message);
  }

  _openDialog() {
    throw new Error('This method should be implemented.');
  }

  _prepareEventName(eventName) {
    return this.EVENT_NAMESPACE + ':' + eventName;
  }

}

module.exports = AbstractOpenable;
