import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'label',

  actions: {
    innerRadioChanged: function(value) {
      this.sendAction('changed', value);
    }
  }
});
