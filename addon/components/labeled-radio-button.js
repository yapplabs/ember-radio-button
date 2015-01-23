import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'label',

  actions: {
    changed: function(value) {
      this.sendAction('changed', value);
    }
  }
});
