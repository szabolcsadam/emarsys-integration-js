'use strict';

const consts = require('../consts');
const FakeWindow = require('../mocks/fake_window');
const MessageHandler = require('./unload_init');

describe('UnloadInit Handler', function() {

  let fakeWindow;
  let messageHandler;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    messageHandler = new MessageHandler(fakeWindow);
  });

  it('should listen to messages with event "unload:init"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('unload:init');
  });

  describe('#getFakeConfirmMessage', function() {
    it('should return a message-like data structure', function() {
      const fakeMessage = messageHandler.getFakeConfirmMessage({
        data: {}
      });
      expect(fakeMessage).to.have.all.keys(['data', 'source']);
    });

    it('should use data passed', function() {
      const testData = {
        title: 'test-title',
        body: 'test-body',
        ok: 'test-ok',
        cancel: 'test-cancel',
        style: 'condensed'
      };
      const fakeMessage = messageHandler.getFakeConfirmMessage({
        data: {
          confirm: testData
        }
      });
      expect(fakeMessage.data).to.eql(testData);
    });

    it('should fake source as EMARSYS', function() {
      const fakeMessage = messageHandler.getFakeConfirmMessage({
        data: {}
      });
      expect(fakeMessage.source.integration_id).to.eql(consts.EMARSYS_INTEGRATION_ID);
    });
  });

});
