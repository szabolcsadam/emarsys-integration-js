'use strict';

const FakeWindow = require('../mocks/fake_window');
const MessageHandler = require('./get_url');

describe('GetUrl Handler', function() {

  let fakeWindow;
  let transmitter;
  let messageHandler;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);

    transmitter = {
      messageToService: this.sandbox.spy()
    };

    messageHandler = new MessageHandler(fakeWindow, transmitter);
  });

  const getUrl = ({ target, params = {}, eventId = 111 }) => {
    return messageHandler.handleMessage({
      event: 'get_url',
      data: {
        target,
        params,
        eventId
      },
      source: {
        integration_instance_id: 1
      }
    });
  };

  it('should send back proper url when calling handleMessage with params', function() {
    getUrl({
      target: 'email_analysis/details',
      params: {
        campaign_id: 666,
        launch_id: 999
      },
      eventId: 42
    });

    const expectedUrl = [
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
    ].join('&');

    expect(transmitter.messageToService).to.have.been.calledWithMatch(
      'get_url:response',
      { id: 42, success: true, url: expectedUrl }
    );
  });

  it('should send back proper url when calling handleMessage with the correct campaignId params', function() {
    getUrl({
      target: 'email_campaigns/preview',
      params: {
        campaign_id: 666
      },
      eventId: 42
    });

    const expectedUrl = [
      'preview_fs.php?session_id=SESSIONID',
      'camp_id=666'
    ].join('&');

    expect(transmitter.messageToService).to.have.been.calledWithMatch(
      'get_url:response',
      { id: 42, success: true, url: expectedUrl }
    );
  });

  it('should send back proper url when calling handleMessage without params', function() {
    getUrl({ target: 'email_campaigns/list' });

    expect(transmitter.messageToService).to.have.been.calledWithMatch(
      'get_url:response',
      { id: 111, success: true, url: 'campaignmanager.php?session_id=SESSIONID&action=list' }
    );
  });

  it('should send back error when called with invalid pathname', function() {
    getUrl({ target: 'invalid/pathname' });

    expect(transmitter.messageToService).to.have.been.calledWithMatch(
      'get_url:response',
      { id: 111, success: false, error: 'Error 404: Unknown pathname' }
    );
  });
});
