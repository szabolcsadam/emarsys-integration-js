'use strict';

const DialogFactory = require('./dialog_factory');

describe('DialogFactory', function() {

  describe('#create', function() {
    it('should create a factory instance', function() {
      const dialogFactory = DialogFactory.create();
      expect(dialogFactory).to.respondTo('createConfirmDialog');
      expect(dialogFactory).to.respondTo('createModalDialog');
    });
  });

});
