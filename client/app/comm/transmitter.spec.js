'use strict';

const FakeWindow = require('../mocks/fake_window');
const Transmitter = require('./transmitter');

describe('Transmitter', function() {

  let fakeWindow;
  let transmitter;

  const testMessage = {
    key: 'value'
  };

  const jsonMessage = JSON.stringify({
    event: 'foo',
    data: testMessage,
    source: {
      integration_id: 'integration-id',
      integration_instance_id: 1234
    }
  });

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    transmitter = new Transmitter({
      global: fakeWindow,
      integrationId: 'integration-id',
      integrationInstanceId: 1234
    });
  });

  describe('#messageToEmarsys', function() {
    it('should call window.postMessage', function() {
      transmitter.messageToEmarsys('foo', testMessage);
      expect(fakeWindow.postMessage).to.have.been.calledWith(jsonMessage, '*');
    });
  });

  describe('#messageToService', function() {
    it('should look for the iframe addressed', function() {
      transmitter.messageToService('foo', testMessage, 1234);
      expect(fakeWindow.$).to.be.calledWith('#integration-1234');
    });

    it('should send a post message to the iframe with proper data', function() {
      transmitter.messageToService('foo', testMessage, 1234);
      expect(fakeWindow.$('foo')[0].contentWindow.postMessage).to.be.calledWith(jsonMessage, '*');
    });
  });

});
