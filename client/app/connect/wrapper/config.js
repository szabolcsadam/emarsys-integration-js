'use strict';

class WrapperConfig {

  static create(SuiteAPI) {
    if (!SuiteAPI.config) {
      throw new Error('No Config found in SuiteAPI.');
    }

    return SuiteAPI.config;
  }
}

module.exports = WrapperConfig;
