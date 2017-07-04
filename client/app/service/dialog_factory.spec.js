'use strict';

const DialogFactory = require('./dialog_factory');
const Confirm = require('./components/confirm');
const Modal = require('./components/modal');
const fakeMessage = { data: { title: 'foo' } };

describe('DialogFactory', function() {
  let dialogFactory;

  beforeEach(function() {
    dialogFactory = DialogFactory.create();
  });

  describe('#createConfirmDialog', function() {
    it('should create a Confirm instance', function() {
      const dialog = dialogFactory.createConfirmDialog('global', fakeMessage);
      expect(dialog).to.be.an.instanceof(Confirm);
    });
  });

  describe('#createModalDialog', function() {
    it('should create a Modal instance', function() {
      const modal = dialogFactory.createModalDialog('global', fakeMessage);
      expect(modal).to.be.an.instanceof(Modal);
    });
  });
});
