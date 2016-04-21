'use strict';

class WrapperCampaign {

  static create(SuiteAPI) {
    return SuiteAPI.campaign || {
      id: null,
      persPrefix: '$',
      persSuffix: '$'
    };
  }

}

module.exports = WrapperCampaign;
