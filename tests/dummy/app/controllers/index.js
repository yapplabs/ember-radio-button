import Ember from 'ember';
export default Ember.Controller.extend({
  color: 'green',
  number: 'one',
  numbersDisabled: true,
  actions: {
    colorChanged: function(color){
      window.alert('Color changed to ' + color);
    }
  }
});
