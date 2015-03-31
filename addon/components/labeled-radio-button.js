import Ember from 'ember';

var computed = Ember.computed;

export default Ember.Component.extend({
  tagName: 'label',
  classNameBindings: ['checked'],

  checked: computed('groupValue', 'value', function(){
    return this.get('groupValue') === this.get('value');
  }).readOnly(),

  actions: {
    innerRadioChanged: function(value) {
      this.sendAction('changed', value);
    }
  }
});
