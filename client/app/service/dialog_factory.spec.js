'use strict';

const DialogFactory = require('./dialog_factory');
const fakeMessage = { data: { title: 'foo' } };

describe('DialogFactory', function() {
  let dialogFactory;

  beforeEach(function() {
    dialogFactory = DialogFactory.create();
  });

  describe('#createConfirmDialog', function() {
    it('should create a Confirm instance', function() {
      const dialog = dialogFactory.createConfirmDialog('global', fakeMessage);
      expect(dialog.constructor.name).to.equal('Confirm');
    });
  });

  describe('#createModalDialog', function() {
    it('should create a Modal instance', function() {
      const modal = dialogFactory.createModalDialog('global', fakeMessage);
      expect(modal.constructor.name).to.equal('Modal');
    });
  });
});
