'use strict';

const WrapperIntegration = require('./wrapper/integration');

class ConnectCore {
  constructor(SuiteAPI, global) {
    this.SuiteAPI = SuiteAPI;
    this.global = global;
    this.IntegrationAPI = WrapperIntegration.create(this.SuiteAPI, this.global);
  }

  save(integrationInstanceId) {
    let saveButton = document.getElementById('content-save-button');
    if (saveButton.classList.contains('e-btn-disabled')) {
      return;
    }

    saveButton.classList.add('e-btn-disabled');
    this.global.Emarsys.integration.messageToService('save', {}, integrationInstanceId);
  }

  feedback(integrationInstanceId) {
    this.global.Emarsys.integration.messageToService('feedback', {}, integrationInstanceId);
  }

  static create(SuiteAPI, global) {
    return new ConnectCore(SuiteAPI, global);
  }
}

module.exports = ConnectCore;
