import Ember from 'ember';
export default Ember.Controller.extend({
  color: 'green',
  number: 'one',
  numbersDisabled: true,
  noDefault: '',
  actions: {
    colorChanged(color) {
      this.set('color', color);
    }
  },
  reservation: Ember.Object.create({
    number: 'one'
  })
});
