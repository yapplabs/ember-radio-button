import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['ember-radio-button-group'],

  actions: {
    changed(newValue) {
      this.sendAction('changed', newValue);
    }
  }
});
