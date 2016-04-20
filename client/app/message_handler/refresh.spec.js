'use strict';

const FakeWindow = require('../mocks/fake_window');
const MessageHandler = require('./refresh');

describe('Refresh Handler', function() {

  let fakeWindow;
  let messageHandler;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    messageHandler = new MessageHandler(fakeWindow);
  });

  it('should listen to messages with event "refresh"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('refresh');
  });

  it('should call location.reload when calling handleMessage', function() {
    messageHandler.handleMessage();
    expect(fakeWindow.location.reload).to.have.been.called;
  });

});
