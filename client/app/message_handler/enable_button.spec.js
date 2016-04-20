'use strict';

const FakeWindow = require('../mocks/fake_window');
const MessageHandler = require('./enable_button');

describe('EnableButton Handler', function() {

  let fakeWindow;
  let messageHandler;
  const fakeSelection = 'fake_selection';

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
