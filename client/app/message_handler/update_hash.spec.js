'use strict';

const FakeWindow = require('../mocks/fake_window');
const MessageHandler = require('./update_hash');

describe('UpdateHash Handler', function() {

  let fakeWindow;
  let messageHandler;
  const fakeHash = '#/campaigns/new';

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    messageHandler = new MessageHandler(fakeWindow);
  });

  it('should listen to messages with event "update hash"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('update_hash');
  });

  it('should set window location hash to the passed value', function() {
    messageHandler.handleMessage({
      data: {
        hash: fakeHash
      }
    });
    expect(fakeWindow.location.hash).to.be.equal(fakeHash);
  });

});
