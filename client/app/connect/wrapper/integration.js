'use strict';

class WrapperIntegration {

  static create(SuiteAPI) {
    if (!SuiteAPI.integration) {
      throw new Error('No Integration Core API found in SuiteAPI.');
    }

    return SuiteAPI.integration;
  }
}

module.exports = WrapperIntegration;
