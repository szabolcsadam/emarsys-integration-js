'use strict';

var sinon = require('sinon');
var MessageHandler = require('./proxy');

describe('Proxy Handler', function() {

  var fakeWindow;
  var fakeIframe;
  var messageHandler;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create();
    fakeIframe = require('../mocks/fake_iframe').create();
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
        messageToService: sinon.stub()
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
