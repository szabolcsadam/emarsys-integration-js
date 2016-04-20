'use strict';

const FakeWindow = require('../mocks/fake_window');
const MessageHandler = require('./confirm');

describe('Confirm Handler', function() {

  let fakeWindow;
  let messageHandler;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    messageHandler = new MessageHandler(fakeWindow);
  });

  it('should listen to messages with event "confirm"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('confirm');
  });

});
