'use strict';

var _ = require('lodash');
var jquery = require('jquery');

class FakeJQuery extends Array {
  constructor(sandbox) {
    super();

    this.removeClass = sandbox.stub();

    this.off = sandbox.stub();

    this.remove = sandbox.stub();

    this.push({
      contentWindow: {
        postMessage: sandbox.stub()
      }
    });
  }

  static create(sandbox) {
    var retval = sandbox.stub().returns(new FakeJQuery(sandbox));
    retval.extend = _.extend;
    retval.Deferred = jquery.Deferred;
    return retval;
  }
}

module.exports = FakeJQuery;
