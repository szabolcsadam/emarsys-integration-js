'use strict';

var extend = require('extend');
var ConfirmComponent = require('./components/confirm');
var ModalComponent = require('./components/modal');

class DialogApi {

  get params() {
    return JSON.parse(document.getElementsByTagName('e-modal')[0].getAttribute('data-params'));
  }

  constructor(api) {
    this.api = api;
    this.global = api.global;

    this.deferreds = {};
    this.confirmParams = {};
  }

  submit(success, data) {
    data = data || {};
    var message = this.generateMessageData(success, data);

    if (this.deferreds[this.params.dialogId]) {
      if (success) {
        this.deferreds[this.params.dialogId].resolve(message);
      } else {
        this.deferreds[this.params.dialogId].reject(message);
      }
    } else {
      this.api.messageToService('dialog:submit', message, this.params.openerIntegrationInstanceId);
    }
  }

  generateMessageData(success, data = {}) {
    var message = extend({
      dialogId: this.params.dialogId,
      success: success
    }, data);

    if (this.confirmParams[this.params.dialogId]) {
      message = extend(message, this.confirmParams[this.params.dialogId]);
    }

    return message;
  }

  confirm(options) {
    if (!options.dialogId) {
      options.dialogId = Math.floor(Math.random() * 10000000);
    }

    if (options.params) {
      this.confirmParams[options.dialogId] = options.params;
    }

    this.getConfirmComponent(options).render();

    if (options.source.integration_id === 'SUITE') {
      this.deferreds[options.dialogId] = this.global.$.Deferred();
      return this.deferreds[options.dialogId].promise();
    }
  }

  getConfirmComponent(options) {
    return new ConfirmComponent(this.global, options);
  }

  confirmNavigation(url, confirmOptions) {
    var confirmPromise = this.confirm(confirmOptions);

    confirmPromise.then(() => {
      this.global.$(this.global).off('beforeunload');
      this.global.location.href = url;
    }).fail(() => {
      this.close();
    });

    return confirmPromise;
  }

  modal(options) {
    new ModalComponent(this.global, options).render();
  }

  close() {
    this.global.$('e-modal').remove();
  }

}

module.exports = DialogApi;
