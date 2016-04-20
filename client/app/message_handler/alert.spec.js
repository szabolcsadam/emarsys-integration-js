'use strict';

const FakeWindow = require('../mocks/fake_window');
const MessageHandler = require('./alert');

describe('Alert Handler', function() {

  let fakeWindow;
  let messageHandler;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    messageHandler = new MessageHandler(fakeWindow);
  });

  it('should listen to messages with event "alert"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('alert');
  });

  describe('#getClassNames', function() {
    const testCases = [
      {
        name: 'should return classNames when no special className specified',
        message: {
          data: {}
        },
        expected: [
          'e-alert'
        ]
      },
      {
        name: 'should return classNames when className is specified',
        message: {
          data: {
            className: 'e-alert-foo'
          }
        },
        expected: [
          'e-alert',
          'e-alert-foo'
        ]
      },
      {
        name: 'should return classNames when icon is specified',
        message: {
          data: {
            icon: 'foo'
          }
        },
        expected: [
          'e-alert',
          'e-alert-withicon'
        ]
      },
      {
        name: 'should return classNames when className and icon is specified',
        message: {
          data: {
            className: 'e-alert-foo',
            icon: 'bar'
          }
        },
        expected: [
          'e-alert',
          'e-alert-foo',
          'e-alert-withicon'
        ]
      }
    ];

    testCases.forEach(function(test) {
      it(test.name, function() {
        const classNames = messageHandler.getClassNames(test.message);
        expect(classNames).to.eql(test.expected);
      });
    });
  });

  describe('#getHtml', function() {
    beforeEach(function() {
      this.sandbox.stub(messageHandler, 'cleanMessage', function(text) {
        return text;
      });
    });

    const testCases = [
      {
        name: 'should return HTML with classNames',
        message: {
          data: {}
        },
        expected: 'e-alert'
      },
      {
        name: 'should return HTML with proper class when icon is set',
        message: {
          data: {
            icon: 'foo'
          }
        },
        expected: 'e-alert__icon'
      },
      {
        name: 'should return HTML with the icon referred when icon is set',
        message: {
          data: {
            icon: 'foo'
          }
        },
        expected: '#foo'
      },
      {
        name: 'should return HTML with text message',
        message: {
          data: {
            text: 'lorem ipsum dolor sit amet'
          }
        },
        expected: 'lorem ipsum dolor sit amet'
      }
    ];

    testCases.runTests(function(test) {
      const html = messageHandler.getHtml(test.message);
      expect(html).to.have.string(test.expected);
    });
  });
});
