'use strict';

const FakeWindow = require('../mocks/fake_window');
const MessageHandler = require('./intercom_track_event');

describe('Intercom TrackEvent handler', function() {

  let fakeWindow;
  let messageHandler;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    messageHandler = new MessageHandler(fakeWindow);
  });

  it('should listen to messages with event "intercom:track_event"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.eql('intercom:track_event');
  });


  it('should call Intercom upon receiving proper messages', function() {
    const fakeIntercom = {
      trackEvent: this.sandbox.stub(),
      update: this.sandbox.stub()
    };

    fakeWindow.Intercom = fakeIntercom;

    messageHandler.handleMessage({
      data: {
        name: 'test-name',
        metadata: { testKey: 'testValue' }
      }
    });

    expect(fakeIntercom.trackEvent).to.have.been.calledWith('test-name', { testKey: 'testValue' });
    expect(fakeIntercom.update).to.have.been.called;
  });

});
