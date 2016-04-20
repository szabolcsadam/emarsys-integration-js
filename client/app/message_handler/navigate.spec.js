'use strict';

var FakeWindow = require('../mocks/fake_window');
var MessageHandler = require('./navigate');

describe('Navigate Handler', function() {

  var fakeWindow;
  let transmitter;
  var messageHandler;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);

    transmitter = {
      messageToService: this.sandbox.spy()
    };

    messageHandler = new MessageHandler(fakeWindow, transmitter);
  });

  it('should listen to messages with event "navigate"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('navigate');
  });

  it('should set proper location when calling handleMessage with params', function() {
    messageHandler.handleMessage({
      event: 'navigate',
      data: {
        target: 'email_analysis/details',
        params: {
          campaign_id: 666,
          launch_id: 999
        }
      },
      source: {
        integration_instance_id: 1
      }
    });

    expect(fakeWindow.location.href).to.eql([
      'repmanager.php?session_id=SESSIONID',
      'changed=0',
      'action=analysis',
      'camp_id=666',
      'launch_id=999',
      'page=1',
      'search=',
      'step=1',
      'save_pref=on',
      'tabdetails_length=10',
      'tabfull_length=10',
      'campaign_category=',
      'admin=n',
      'status=current',
      'type=all'
    ].join('&'));
  });

  it('should set proper location when calling handleMessage without params', function() {
    messageHandler.handleMessage({
      event: 'navigate',
      data: {
        target: 'email_campaigns/list'
      },
      source: {
        integration_instance_id: 1
      }
    });

    expect(fakeWindow.location.href).to.eql('campaignmanager.php?session_id=SESSIONID&action=list');
  });

  describe('when unload confirm is initialized', function() {
    beforeEach(function() {
      fakeWindow.Emarsys.integration.unload.initialized = true;
      fakeWindow.Emarsys.integration.dialog.confirmNavigation = this.sandbox.stub().returns(fakeWindow.resolved());
    });

    it('should pop a confirm dialog when we have the unload confirm initialized', function() {
      messageHandler.handleMessage({
        event: 'navigate',
        data: {
          target: 'email_campaigns/list'
        },
        source: {
          integration_instance_id: 1
        }
      });

      expect(fakeWindow.Emarsys.integration.dialog.confirmNavigation).to.be.called;
    });

    it('should send response back to the service with success true', function(done) {
      messageHandler.handleMessage({
        event: 'navigate',
        data: {
          eventId: 1,
          target: 'email_campaigns/list'
        },
        source: {
          integration_instance_id: 1
        }
      })
        .then(() => {
          expect(transmitter.messageToService).to.have.been.calledWithMatch(
            'navigate:response',
            { id: 1, success: true }
          );

          done();
        });
    });
  });

  describe('when unload confirm is not initialized', function() {
    beforeEach(function() {
      fakeWindow.Emarsys.integration.unload.initialized = false;
    });

    it('should send response back to the service with success true', function() {
      messageHandler.handleMessage({
        event: 'navigate',
        data: {
          eventId: 1,
          target: 'email_campaigns/list'
        },
        source: {
          integration_instance_id: 1
        }
      });

      expect(transmitter.messageToService).to.have.been.calledWithMatch(
        'navigate:response',
        { id: 1, success: true }
      );

    });
  });

  it('should throw 404 when calling getUrlByTarget with invalid pathname', function() {
    var exceptionThrown;

    try {
      messageHandler.getUrlByTarget('invalid/pathname');
    } catch (e) {
      exceptionThrown = e;
    }

    expect(exceptionThrown.message).to.eql('Error 404: Unknown pathname');
  });
});
