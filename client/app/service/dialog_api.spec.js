'use strict';

var sinon = require('sinon');
var Q = require('q');
var EmarsysApi = require('./emarsys_api');
var DialogApi = require('./dialog_api');

describe('DialogApi', function() {

  var fakeWindow;
  var emarsysApi;
  var dialogApi;

  beforeEach(function() {
    fakeWindow = require('../mocks/fake_window').create();
    emarsysApi = new EmarsysApi({
      global: fakeWindow,
      integrationId: 'EMARSYS',
      integrationInstanceId: 'EMARSYS'
    });
    dialogApi = new DialogApi(emarsysApi);
  });

  describe('#submit', function() {
    var fakeMessage = {
      message: 'fake-message'
    };
    var fakeDialogId = 'foo';

    beforeEach(function() {
      sinon.stub(emarsysApi, 'messageToService');
      sinon.stub(dialogApi, 'params', {
        get: function() {
          return {
            dialogId: fakeDialogId,
            openerIntegrationInstanceId: 'bar'
          };
        }
      });

      sinon.stub(dialogApi, 'generateMessageData').returns(fakeMessage);
    });

    it('should generate a message', function() {
      dialogApi.submit(true);
      expect(dialogApi.generateMessageData).to.be.called;
    });

    describe('submitting to a service', function() {
      it('should send the message to a service', function() {
        dialogApi.submit(true);
        expect(emarsysApi.messageToService).to.be.calledWith('dialog:submit', fakeMessage, 'bar');
      });
    });

    describe('submitting to Emarsys', function() {
      beforeEach(function() {
        dialogApi.deferreds[fakeDialogId] = Q.defer();
        sinon.stub(dialogApi.deferreds[fakeDialogId], 'reject');
        sinon.stub(dialogApi.deferreds[fakeDialogId], 'resolve');
      });

      it('should send message when resolving the promise', function() {
        dialogApi.submit(true);
        expect(dialogApi.deferreds[fakeDialogId].resolve).to.be.calledWith(fakeMessage);
      });

      it('should send message when rejecting the promise', function() {
        dialogApi.submit(false);
        expect(dialogApi.deferreds[fakeDialogId].reject).to.be.calledWith(fakeMessage);
      });
    });
  });

  describe('#close', function() {
    it('should look up e-modal elements', function() {
      dialogApi.close();
      expect(fakeWindow.$).to.be.calledWith('e-modal');
    });
  });

  describe('#generateMessageData', function() {
    beforeEach(function() {
      sinon.stub(emarsysApi, 'messageToService');
      sinon.stub(dialogApi, 'params', {
        get: function() {
          return {
            dialogId: 'foo',
            openerIntegrationInstanceId: 'bar'
          };
        }
      });
    });

    describe('without confirmParams', function() {
      var testCases = [
        {
          name: 'should pass success when true',
          success: true,
          data: null,
          expected: {
            dialogId: 'foo',
            success: true
          }
        },
        {
          name: 'should pass success when false',
          success: false,
          data: null,
          expected: {
            dialogId: 'foo',
            success: false
          }
        },
        {
          name: 'should pass data too',
          success: false,
          data: {
            key: 'value'
          },
          expected: {
            dialogId: 'foo',
            success: false,
            key: 'value'
          }
        }
      ];

      testCases.forEach(function(test) {
        it(test.name, function() {
          var message = dialogApi.generateMessageData(test.success, test.data);
          expect(message).to.eql(test.expected);
        });
      });
    });

    describe('with confirmParams', function() {
      it('should also append options from the beginning', function() {
        dialogApi.confirmParams['foo'] = {
          test: 'option-value'
        };
        var message = dialogApi.generateMessageData(true, {
          key: 'data-value'
        });
        expect(message).to.eql({
          dialogId: 'foo',
          success: true,
          key: 'data-value',
          test: 'option-value'
        });
      });
    });
  });

  describe('#confirm', function() {
    var confirmMessage = {
      data: {
        dialogId: 1234
      },
      source: {
        integration_id: 'EMARSYS'
      }
    };
    var fakeConfirmComponent = {
      render: sinon.stub()
    };

    beforeEach(function() {
      dialogApi.getConfirmComponent = sinon.stub().returns(fakeConfirmComponent);
      dialogApi.generateDialogId = sinon.stub().returns(1000);
    });

    it('should create a confirm dialog', function() {
      dialogApi.confirm(confirmMessage);
      expect(dialogApi.getConfirmComponent).to.be.calledWith(confirmMessage);
    });

    it('should create a confirm dialog with a random ID when no ID is given', function() {
      dialogApi.confirm({
        data: {},
        source: confirmMessage.source
      });
      expect(dialogApi.getConfirmComponent).to.be.calledWith({
        data: {
          dialogId: 1000
        },
        source: confirmMessage.source
      });
    });

    it('should render the confirm dialog', function() {
      dialogApi.confirm(confirmMessage);
      expect(fakeConfirmComponent.render).to.be.called;
    });
  });

  describe('#confirmNavigation', function() {
    var fakeUrl = 'http://fake.url';
    var fakeConfirmOptions = {
      key: 'foo'
    };

    beforeEach(function() {
      dialogApi.confirm = sinon.stub().returns(fakeWindow.resolved());
      dialogApi.close = sinon.stub();
    });

    it('should call confirm() with options passed', function(done) {
      dialogApi.confirmNavigation(fakeUrl, fakeConfirmOptions).always(() => {
        expect(dialogApi.confirm).to.be.calledWith(fakeConfirmOptions);
        done();
      });
    });

    it('should set proper location when the confirm promise is resolved', function(done) {
      dialogApi.confirmNavigation(fakeUrl, fakeConfirmOptions).then(() => {
        expect(fakeWindow.location.href).to.eql(fakeUrl);
        done();
      });
    });

    it('should not change location when the confirm promise is rejected', function(done) {
      var originalLocation = fakeWindow.location.href;
      dialogApi.confirm = sinon.stub().returns(fakeWindow.rejected());

      dialogApi.confirmNavigation(fakeUrl, fakeConfirmOptions).fail(() => {
        expect(fakeWindow.location.href).to.eql(originalLocation);
        done();
      });
    });

    it('should close the confirm dialog at the end', function(done) {
      dialogApi.confirm = sinon.stub().returns(fakeWindow.rejected());

      dialogApi.confirmNavigation(fakeUrl, fakeConfirmOptions).fail(() => {
        expect(dialogApi.close).to.be.called;
        done();
      });
    });
  });

});
