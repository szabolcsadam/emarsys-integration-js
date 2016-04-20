'use strict';

var FakeWindow = require('../mocks/fake_window');
var MessageHandler = require('./enable_button');

describe('EnableButton Handler', function() {

  var fakeWindow;
  var messageHandler;
  var fakeSelection = 'fake_selection';

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    messageHandler = new MessageHandler(fakeWindow);
  });

  it('should listen to messages with event "enable"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('enable_button');
  });

  it('should select the element with selection passed', function() {
    messageHandler.handleMessage({
      data: {
        selector: fakeSelection
      }
    });
    expect(fakeWindow.$).to.have.been.calledWith(fakeSelection);
  });

  it('should remove the class "e-btn-disabled" from the element selected', function() {
    messageHandler.handleMessage({
      data: {
        selector: fakeSelection
      }
    });
    expect(fakeWindow.$(fakeSelection).removeClass).to.have.been.calledWith('e-btn-disabled');
  });

});
