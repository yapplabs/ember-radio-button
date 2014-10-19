import Ember from 'ember';
export default Ember.Controller.extend({
  color: 'green',
  actions: {
    colorChanged: function(color){
      window.alert('Color changed to ' + color);
    }
  }
});
