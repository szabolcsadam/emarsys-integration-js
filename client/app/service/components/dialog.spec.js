'use strict';

const FakeWindow = require('../../mocks/fake_window');
const Component = require('./confirm');

describe('Dialog Component', function() {

  let fakeWindow;
  let dialogComponent;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
  });

  describe('#getModalOptions', function() {
    const generatedContent = 'generated content';
    const testCases = [
      {
        name: 'should return options with modal title',
        message: {
          data: {
            title: 'foo'
          }
        },
        expected: {
          key: 'headline',
          value: 'foo'
        }
      },
      {
        name: 'should return options with modal body',
        message: {
          data: {
            title: 'foo',
            body: 'bar'
          }
        },
        expected: {
          key: 'content',
          value: generatedContent
        }
      }
    ];

    testCases.forEach(function(test) {
      it(test.name, function() {
        test.message.source = {
          integration_id: 'foo-integration',
          integration_instance_id: 1234
        };

        dialogComponent = new Component(fakeWindow, test.message);
        this.sandbox.stub(dialogComponent, 'cleanMessage', function(text) {
          return text;
        });
        this.sandbox.stub(dialogComponent, 'getModalContent', function() {
          return generatedContent;
        });
        const modalOptions = dialogComponent.getModalOptions();
        expect(modalOptions).to.have.property(test.expected.key, test.expected.value);
      });
    });

  });

});
