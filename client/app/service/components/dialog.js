'use strict';

class Dialog {

  constructor(global, options) {
    this.window = global;
    this.options = options;
    this.integrationInstanceId = Math.floor(Math.random() * 1000000000);
  }

  get dialogClass() {
    return '';
  }

  render() {
    this._modal = this.getHtml();
    this._modal.open(this.getModalOptions());
  }

  getModalOptions() {
    let modalOptions = {
      headline: this.options.data.title,
      width: this.options.data.width + 'px',
      content: this.getModalContent()
    };

    return modalOptions;
  }

  close() {
    this._modal.close();
  }

  getAttribute(attributeName) {
    return this._modal.getAttribute(attributeName);
  }

  getHtml() {
    const eDialog = document.createElement('e-dialog');
    eDialog.className = this.dialogClass;
    return eDialog;
  }

  cleanMessage(text) {
    return this.window.$('<div>' + text + '</div>').text();
  }

}

module.exports = Dialog;
