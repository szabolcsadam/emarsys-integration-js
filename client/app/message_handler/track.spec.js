'use strict';

const FakeWindow = require('../mocks/fake_window');
const MessageHandler = require('./track');

describe('Track Handler', function() {

  let fakeWindow;
  let messageHandler;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    messageHandler = new MessageHandler(fakeWindow);
  });

  it('should listen to messages with event "track"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('track');
  });

  describe('#handleMessage', function() {
    it('should call analytics request with the given options', function() {
      const testData = {
        data: {
          hitType: 'event'
        }
      };

      messageHandler.handleMessage(testData);

      expect(messageHandler.window.analytics.request).to.be.calledWith('send', testData.data);
    });

  });

});
