'use strict';

const AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerAlert extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'alert';
  }

  getClassNames(message) {
    let classNames = [
      'e-alert', 'e-alert-fixed'
    ];

    if (message.data.className) {
      classNames.push(message.data.className);
    }

    if (message.data.icon) {
      classNames.push('e-alert-withicon');
    }

    return classNames;
  }

  getHtml(message) {
    let markup = [
      '<div class="' + this.getClassNames(message).join(' ') + '">'
    ];

    if (message.data.icon) {
      markup.push('<span class="e-alert__icon">');
      markup.push('<svg class="e-icon"><use xlink:href="#' + message.data.icon + '"></use></svg>');
      markup.push('</span>');
    }

    markup.push('<span class="e-alert__message">' + this.cleanMessage(message.data.text) + '</span>');
    markup.push('</div>');

    return markup.join('\n');
  }

  handleMessage(message) {
    message.data.timeout = message.data.timeout || 5000;

    let $eAlert = $(this.getHtml(message));
    $eAlert.appendTo(this.getMessageContainerElement());

    window.setTimeout(function() {
      $eAlert.fadeOut('normal', function() {
        $(this).remove();
      });
    }, message.data.timeout);
  }

}

module.exports = MessageHandlerAlert;
