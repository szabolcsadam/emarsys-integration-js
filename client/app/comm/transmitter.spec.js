'use strict';

var FakeWindow = require('../mocks/fake_window');
var Transmitter = require('./transmitter');

describe('Transmitter', function() {

  var fakeWindow;
  var transmitter;

  var testMessage = {
    key: 'value'
  };

  var jsonMessage = JSON.stringify({
    event: 'foo',
    data: testMessage,
    source: {
      integration_id: 'integration-id',
      integration_instance_id: 1234
    }
  });

  beforeEach(function() {
    fakeWindow = FakeWindow.create();
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
