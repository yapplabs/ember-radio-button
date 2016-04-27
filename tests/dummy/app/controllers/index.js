import Ember from 'ember';
export default Ember.Controller.extend({
  color: 'green',
  number: 'one',
  numbersDisabled: true,
  noDefault: '',
  actions: {
    colorChanged(color) {
      this.set('color', color);
    },
    numbersDisabledChanged(numbersDisabled) {
      this.set('numbersDisabled', numbersDisabled);
    },
    numberChanged(number) {
      this.set('number', number);
    },
    noDefaultChanged(noDefault) {
      this.set('noDefault', noDefault);
    },
    modelNumberChanged(modelNumber) {
      this.set('reservation.number', modelNumber);
    }
  },
  reservation: Ember.Object.create({
    number: 'one'
  })
});
