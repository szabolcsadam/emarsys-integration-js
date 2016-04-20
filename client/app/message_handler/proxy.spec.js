'use strict';

var FakeWindow = require('../mocks/fake_window');
var MessageHandler = require('./proxy');

describe('Proxy Handler', function() {

  var fakeWindow;
  var messageHandler;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    messageHandler = new MessageHandler(fakeWindow);
  });

  it('should listen to messages with event "proxy"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('proxy');
  });

  describe('#handleMessage', function() {
    var message = {
      data: {
        envelope: {
          foo: 'bar'
        },
        integrationInstanceId: 1234
      }
    };

    beforeEach(function() {
      messageHandler.window.Emarsys.integration = {
        messageToService: this.sandbox.stub()
      };
    });

    it('should send the message the service', function() {
      messageHandler.handleMessage(message);
      expect(messageHandler.window.Emarsys.integration.messageToService).to.be.calledWith(
        message.data.event,
        message.data.envelope,
        message.data.integrationInstanceId);
    });
  });

});
