import Ember from 'ember';

const {
  Controller,
  Object: EmberObject
} = Ember;

export default Controller.extend({
  color: 'green',
  number: 'one',
  numbersDisabled: true,
  noDefault: '',
  actions: {
    colorChanged(color) {
      window.alert(`Color changed to ${color}`);
    }
  },
  reservation: EmberObject.create({
    number: 'one'
  })
});
