'use strict';

describe('EmarsysApi', function() {

  var fakeWindow;
  var emarsysApi;

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
    fakeWindow = require('../mocks/fake_window').create();
    emarsysApi = require('./emarsys_api').create({
      global: fakeWindow,
      integrationId: 'integration-id',
      integrationInstanceId: 1234
    });
  });

  describe('#messageToService', function() {
    it('should look for the iframe addressed', function() {
      emarsysApi.messageToService('foo', testMessage, 1234);
      expect(fakeWindow.$).to.be.calledWith('#integration-1234');
    });

    it('should send a post message to the iframe with proper data', function() {
      emarsysApi.messageToService('foo', testMessage, 1234);
      expect(fakeWindow.$('foo')[0].contentWindow.postMessage).to.be.calledWith(jsonMessage, '*');
    });
  });

  describe('#messageToEmarsys', function() {
    it('should call window.postMessage', function() {
      emarsysApi.messageToEmarsys('foo', testMessage);
      expect(fakeWindow.postMessage).to.have.been.calledWith(jsonMessage, '*');
    });
  });

  describe('#setMessageSource', function() {
    it('should extend message with source', function() {
      var result = emarsysApi.setMessageSource({
        event: 'foo'
      });
      expect(result).to.eql({
        event: 'foo',
        source: {
          integration_id: 'integration-id',
          integration_instance_id: 1234
        }
      });
    });
  });

});
