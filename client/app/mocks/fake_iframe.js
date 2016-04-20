'use strict';

class FakeIframe {
  constructor() {
    this.contentWindow = {
      postMessage: this.sandbox.stub()
    };
  }

  static create() {
    return new FakeIframe();
  }
}

module.exports = FakeIframe;
