'use strict';

const FakeWindow = require('../../mocks/fake_window');
const Component = require('./modal');

describe('Modal Component', function() {

  let fakeWindow;
  let modalComponent;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    modalComponent = new Component(fakeWindow);
  });

  describe('#getAttributes', function() {
    let attributes;

    beforeEach(function() {
      attributes = modalComponent.getAttributes({
        data: {
          src: 'http://example.com',
          width: 100,
          height: 200,
          shouldNotPass: 'really'
        },
        source: {
          integration_id: 'foo-integration',
          integration_instance_id: 1234
        }
      }, 9876);
    });

    it('should return src attribute', function() {
      expect(attributes).to.contain('src="http://example.com"');
    });

    it('should return width attribute', function() {
      expect(attributes).to.contain('width="100"');
    });

    it('should return height attribute', function() {
      expect(attributes).to.contain('height="200"');
    });

    it('should return integration class', function() {
      expect(attributes).to.contain('class="integration integration-foo-integration"');
    });

    it('should return integration id', function() {
      expect(attributes).to.contain('id="integration-9876"');
    });

    it('should return frameborder', function() {
      expect(attributes).to.contain('frameborder="0"');
    });

    it('should not return any other attribute', function() {
      expect(attributes).to.have.length(6);
    });
  });

  describe('#getHtml', function() {
    const testCases = [
      {
        name: 'should return HTML with e-modal tag',
        message: {
          data: {
            src: 'http://example.com'
          }
        },
        expected: '<e-modal'
      },
      {
        name: 'should set width to 650 by default',
        message: {
          data: {
            src: 'http://example.com'
          }
        },
        expected: 'width="650"'
      },
      {
        name: 'should set height to 500 by default',
        message: {
          data: {
            src: 'http://example.com'
          }
        },
        expected: 'height="500"'
      },
      {
        name: 'should return HTML with iframe',
        message: {
          data: {
            src: 'http://example.com'
          }
        },
        expected: '<iframe'
      },
      {
        name: 'should return HTML with iframe with proper src',
        message: {
          data: {
            src: 'http://example.com',
            dialogId: 1111
          }
        },
        expected: [
          'src="http://example.com?dialogId=1111',
          'integration_id=foo-integration',
          'integration_instance_id=9876',
          'opener_integration_instance_id=1234"'
        ].join('&')
      },
      {
        name: 'should return HTML with iframe with proper src for src with params too',
        message: {
          data: {
            src: 'http://example.com?param=foo',
            dialogId: 1111
          }
        },
        expected: [
          'src="http://example.com?param=foo',
          'dialogId=1111',
          'integration_id=foo-integration',
          'integration_instance_id=9876',
          'opener_integration_instance_id=1234"'
        ].join('&')
      },
      {
        name: 'should set width to value passed',
        message: {
          data: {
            src: 'http://example.com',
            width: 100
          }
        },
        expected: 'width="100"'
      },
      {
        name: 'should set height to value passed',
        message: {
          data: {
            src: 'http://example.com',
            height: 200
          }
        },
        expected: 'height="200"'
      }
    ];

    testCases.runTests(function(test) {
      test.message.source = {
        integration_id: 'foo-integration',
        integration_instance_id: 1234
      };

      const html = modalComponent.getHtml(test.message, 9876);
      expect(html).to.have.string(test.expected);
    });
  });
});
