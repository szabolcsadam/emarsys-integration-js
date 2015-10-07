'use strict';

var sinon = require('sinon');
var EventListener = require('./message_handler/listener');

describe('Integration', function() {

  var fakeWindow;
  var eventListener;

  beforeEach(function() {
    fakeWindow = require('./mocks/fake_window').create();
    eventListener = new EventListener(fakeWindow);
  });

  it('should trigger alertHandler when receiving an "alert" event', function() {
    var eventData = {
      event: 'alert',
      data: {
        foo: 'bar'
      }
    };

    sinon.stub(eventListener.messageHandlers.alert, 'handleMessage');
    fakeWindow.trigger('message', {
      data: JSON.stringify(eventData)
    });

    expect(eventListener.messageHandlers.alert.handleMessage).to.have.been.calledWith(eventData);
  });

  it('should not trigger refreshHandler when receiving an "alert" event', function() {
    var eventData = {
      event: 'alert',
      data: {
        foo: 'bar'
      }
    };

    sinon.stub(eventListener.messageHandlers.alert, 'handleMessage');
    sinon.stub(eventListener.messageHandlers.refresh, 'handleMessage');
    fakeWindow.trigger('message', {
      data: JSON.stringify(eventData)
    });

    expect(eventListener.messageHandlers.refresh.handleMessage).to.have.callCount(0);
  });
});
