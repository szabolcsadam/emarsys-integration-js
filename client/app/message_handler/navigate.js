'use strict';

var AbstractMessageHandler = require('./abstract_message_handler');

class MessageHandlerNavigate extends AbstractMessageHandler {

  get MESSAGE_EVENT() {
    return 'navigate';
  }

  getUrlByTarget(pathname) {
    var targets = {
      'email_campaigns/list': [
        'campaignmanager.php?session_id={session_id}',
        'action=list'
      ].join('&'),

      'email_campaigns/edit': [
        'campaignmanager.php?session_id={session_id}',
        'action=content',
        'camp_id={campaign_id}'
      ].join('&'),

      'email_analysis/list': [
        'repmanager.php?session_id={session_id}',
        'action=overview'
      ].join('&'),

      'email_analysis/details': [
        'repmanager.php?session_id={session_id}',
        'changed=0',
        'action=analysis',
        'camp_id={campaign_id}',
        'launch_id={launch_id}',
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
      ].join('&'),

      'contact_lists/details': [
        'userprofiles.php?session_id={session_id}',
        'action=searchnlist',
        'list_id={contact_list_id}'
      ].join('&')
    };

    if (pathname in targets) {
      return targets[pathname];
    }

    throw new Error('Error 404: Unknown pathname');
  }

  replaceUrlParams(url, params = {}) {
    params.session_id = this.window.Emarsys.config.session_id;

    for (var key in params) {
      if (params.hasOwnProperty(key) && key !== 'pathname') {
        url = url.replace('{' + key + '}', params[key]);
      }
    }

    return url;
  }

  handleMessage(message) {
    var url = this.getUrlByTarget(message.data.target);
    url = this.replaceUrlParams(url, message.data.params);

    if (this.window.Emarsys.integration.unload.initialized) {
      return this.window.Emarsys.integration.dialog.confirmNavigation(
        url,
        this.getFakeConfirmMessage(message));
    } else {
      this.window.location.href = url;
    }
  }

}

module.exports = MessageHandlerNavigate;
