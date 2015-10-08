'use strict';

var MessageHandler = require('./unload_init');

describe('UnloadInit Handler', function() {

  var fakeWindow;
  var messageHandler;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create();
    messageHandler = new MessageHandler(fakeWindow);
  });

  it('should listen to messages with event "unload:init"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('unload:init');
  });

  describe('#getFakeConfirmMessage', function() {
    it('should return a message-like data structure', function() {
      var fakeMessage = messageHandler.getFakeConfirmMessage({
        data: {}
      });
      expect(fakeMessage).to.have.all.keys(['data', 'source']);
    });

    it('should use data passed', function() {
      var testData = {
        title: 'test-title',
        body: 'test-body',
        ok: 'test-ok',
        cancel: 'test-cancel'
      };
      var fakeMessage = messageHandler.getFakeConfirmMessage({
        data: {
          confirm: testData
        }
      });
      expect(fakeMessage.data).to.eql(testData);
    });

    it('should fake source as EMARSYS', function() {
      var fakeMessage = messageHandler.getFakeConfirmMessage({
        data: {}
      });
      expect(fakeMessage.source.integration_id).to.eql('EMARSYS');
    });
  });

});
