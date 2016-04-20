'use strict';

const FakeWindow = require('../../mocks/fake_window');
const Component = require('./confirm');

describe('Confirm Component', function() {

  let fakeWindow;
  let confirmComponent;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    confirmComponent = new Component(fakeWindow);

    this.sandbox.stub(confirmComponent, 'cleanMessage', function(text) {
      return text;
    });
  });

  describe('#getModalContent', function() {
    const testCases = [
      {
        name: 'should return HTML with modal title',
        message: {
          data: {
            title: 'foo'
          }
        },
        expected: '<h2>foo</h2>'
      },
      {
        name: 'should return HTML with modal body',
        message: {
          data: {
            title: 'foo',
            body: 'bar'
          }
        },
        expected: '<p>bar</p>'
      },
      {
        name: 'should return HTML with a cancel button',
        message: {
          data: {
            title: 'foo',
            ok: 'yes',
            cancel: 'no'
          }
        },
        regexpected: new RegExp('<button type="button".*class="e-btn">no</button>')
      },
      {
        name: 'should return HTML with an ok button',
        message: {
          data: {
            title: 'foo',
            ok: 'yes',
            cancel: 'no'
          }
        },
        regexpected: new RegExp('<button type="button".*class="e-btn e-btn-primary">yes</button>')
      }
    ];

    testCases.runTests(function(test) {
      test.message.source = {
        integration_id: 'foo-integration',
        integration_instance_id: 1234
      };

      const html = confirmComponent.getModalContent(test.message);
      if (test.regexpected) {
        expect(html).to.match(test.regexpected);
      } else {
        expect(html).to.have.string(test.expected);
      }
    });
  });

  describe('#getButtomHtml', function() {
    it('should provide HTML for a button', function() {
      const buttonHtml = confirmComponent.getButtonHtml('foo', 'bar', 'text');
      const expected = '<button type="button" onClick="foo" class="bar">text</button>';
      expect(buttonHtml).to.be.eql(expected);
    });

    it('should use cleanMessage to clean button text', function() {
      confirmComponent.getButtonHtml('foo', 'bar', 'text');
      expect(confirmComponent.cleanMessage).to.have.been.calledWith('text');
    });
  });

});
