'use strict';

const FakeWindow = require('../mocks/fake_window');
const MessageHandler = require('./resize');

describe('Resize Handler', function() {

  const integrationInstanceId = 'fake_instance_id';
  let fakeWindow;
  let messageHandler;

  beforeEach(function() {
    fakeWindow = FakeWindow.create(this.sandbox);
    messageHandler = new MessageHandler(fakeWindow);
  });

  it('should listen to messages with event "resize"', function() {
    expect(messageHandler.MESSAGE_EVENT).to.be.eql('resize');
  });

  it('should call window.document.getElementById when calling getIntegrationIframe with valid source', function() {
    messageHandler.getIntegrationIframe(integrationInstanceId);
    expect(fakeWindow.document.getElementById).to.have.been.calledWith('integration-' + integrationInstanceId);
  });

  it('should return element when calling getIntegrationIframe with valid source', function() {
    const element = messageHandler.getIntegrationIframe({
      integration_instance_id: integrationInstanceId
    });
    expect(element).to.eql('fake_element');
  });

});
