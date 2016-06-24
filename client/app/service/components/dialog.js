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
    let $eModal = this.window.$(this.getHtml());
    $eModal[0].open(this.getModalOptions());
  }

  getModalOptions() {
    let modalOptions = {
      headline: this.options.data.title,
      width: this.options.data.width + 'px',
      content: this.getModalContent()
    };

    return modalOptions;
  }

  getHtml() {
    return `<e-dialog class="${this.dialogClass}"></e-dialog>`;
  }

  cleanMessage(text) {
    return this.window.$('<div>' + text + '</div>').text();
  }

}

module.exports = Dialog;
