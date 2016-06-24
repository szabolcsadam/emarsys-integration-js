'use strict';

const FakeWindow = require('../../mocks/fake_window');
const Component = require('./confirm');

describe('Confirm Component', function() {

  let fakeWindow;
  let confirmComponent;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
  });

  describe('#getModalContent', function() {
    it('should return HTML with modal body', function() {
      var message = {
        data: {
          title: 'foo',
          body: 'bar'
        }
      };
      confirmComponent = new Component(fakeWindow, message);
      this.sandbox.stub(confirmComponent, 'cleanMessage', function(text) {
        return text;
      });
      const html = confirmComponent.getModalContent();
      expect(html).to.have.string(message.data.body);
    });
  });

  describe('#getModalOptions', function() {
    const testCases = [
      {
        name: 'should return options with a cancel button',
        message: {
          data: {
            title: 'foo',
            ok: 'yes',
            cancel: 'no'
          }
        },
        expected: {
          key: 'buttons.no'
        }
      },
      {
        name: 'should return options with an ok button',
        message: {
          data: {
            title: 'foo',
            ok: 'yes',
            cancel: 'no'
          }
        },
        expected: {
          key: 'buttons.yes'
        }
      }
    ];

    testCases.forEach(function(test) {
      it(test.name, function() {
        test.message.source = {
          integration_id: 'foo-integration',
          integration_instance_id: 1234
        };

        confirmComponent = new Component(fakeWindow, test.message);
        this.sandbox.stub(confirmComponent, 'cleanMessage', function(text) {
          return text;
        });
        const modalOptions = confirmComponent.getModalOptions();
        expect(modalOptions).to.have.deep.property(test.expected.key);
      });
    });

  });

});
