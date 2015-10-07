'use strict';

var MessageHandler = require('./modal_close');

describe('Modal:Close Handler', function() {

  var fakeWindow;
  var messageHandler;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create();
    messageHandler = new MessageHandler(fakeWindow);
  });

  it('should listen to messages with event "modal:close"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('modal:close');
  });

});
