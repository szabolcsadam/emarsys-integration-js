'use strict';

const FakeWindow = require('../mocks/fake_window');
const MessageHandler = require('./modal_close');

describe('Modal:Close Handler', function() {

  let fakeWindow;
  let messageHandler;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    messageHandler = new MessageHandler(fakeWindow);
  });

  it('should listen to messages with event "modal:close"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('modal:close');
  });

});
