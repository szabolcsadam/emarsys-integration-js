'use strict';

var FakeWindow = require('../mocks/fake_window');
var MessageHandler = require('./modal_close');

describe('Modal:Close Handler', function() {

  var fakeWindow;
  var messageHandler;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    messageHandler = new MessageHandler(fakeWindow);
  });

  it('should listen to messages with event "modal:close"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('modal:close');
  });

});
