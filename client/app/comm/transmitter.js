'use strict';

var ServiceTransmitter = require('emarsys-integration-client').comm.Transmitter;

class Transmitter extends ServiceTransmitter {

  sendMessage(message, integrationInstanceId) {
    console.log('Method integration.sendMessage() is deprecated. Use integration.messageToService() instead.');
    this.messageToService(message, integrationInstanceId);
  }

  messageToEmarsys(eventName, data) {
    this.global.postMessage(
      JSON.stringify(
        this.setMessageSource(
          this.compileMessage(eventName, data))), '*');
  }

  messageToService(eventName, data, targetInstanceId) {
    this.global.$('#integration-' + targetInstanceId)[0].contentWindow.postMessage(
      JSON.stringify(
        this.setMessageSource(
          this.compileMessage(eventName, data))), '*');
  }

}

module.exports = Transmitter;
