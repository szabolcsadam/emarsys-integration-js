'use strict';

var extend = require('extend');

class EmarsysApi {

  constructor(options) {
    this.global = options.global;
    this.integrationId = options.integrationId;
    this.integrationInstanceId = options.integrationInstanceId;
  }

  sendMessage(message, integrationInstanceId) {
    console.log('Method integration.sendMessage() is deprecated. Use integration.messageToService() instead.');
    this.messageToService(message, integrationInstanceId);
  }

  messageToService(eventName, data, targetInstanceId) {
    this.global.$('#integration-' + targetInstanceId)[0].contentWindow.postMessage(
      JSON.stringify(
        this.setMessageSource(
          this.compileMessage(eventName, data))), '*');
  }

  messageToEmarsys(eventName, data) {
    this.global.postMessage(
      JSON.stringify(
        this.setMessageSource(
          this.compileMessage(eventName, data))), '*');
  }

  compileMessage(eventName, data) {
    return {
      event: eventName,
      data: data
    };
  }

  setMessageSource(message) {
    return extend({}, message, {
      source: {
        integration_id: this.integrationId,
        integration_instance_id: this.integrationInstanceId
      }
    });
  }

  static create(options) {
    return new EmarsysApi(options);
  }

}

module.exports = EmarsysApi;
