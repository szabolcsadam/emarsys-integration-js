'use strict';

const FakeWindow = require('../mocks/fake_window');
const MessageHandler = require('./modal');

describe('Modal Handler', function() {

  let fakeWindow;
  let messageHandler;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    messageHandler = new MessageHandler(fakeWindow);
  });

  it('should listen to messages with event "modal"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('modal');
  });

  describe('#handleMessage', function() {
    const testCases = [
      {
        name: 'should pass message to modal API',
        message: {
          data: {
            src: '//foo.com/modal'
          }
        },
        expected: {
          data: {
            src: '//foo.com/modal'
          }
        }
      },
      {
        name: 'should prepend host and replace session_id when the modal URL is a relative URL',
        message: {
          data: {
            src: '/modal?session_id={session_id}',
            foo: 2345
          }
        },
        expected: {
          data: {
            src: '//mocked.tld/modal?session_id=SESSIONID',
            foo: 2345
          }
        }
      },
      {
        name: 'should not replace other params of relative URLs',
        message: {
          data: {
            src: '/modal?session_id={session_id}&foo={foo}',
            foo: 2345
          }
        },
        expected: {
          data: {
            src: '//mocked.tld/modal?session_id=SESSIONID&foo={foo}',
            foo: 2345
          }
        }
      }
    ];

    testCases.runTests(function(test) {
      messageHandler.handleMessage(test.message);
      expect(messageHandler.window.Emarsys.integration.dialog.modal).to.be.calledWith(test.expected);
    });

  });

});
