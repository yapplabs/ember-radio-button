import Ember from 'ember';

var computed = Ember.computed;

export default Ember.Component.extend({
  tagName: 'label',
  attributeBindings: ['for'],
  classNameBindings: ['checked'],
  classNames: ['ember-radio-button'],
  defaultLayout: null, // ie8 support

  checked: computed('groupValue', 'value', function(){
    return this.get('groupValue') === this.get('value');
  }).readOnly(),

  'for': computed.readOnly('radioId'),

  actions: {
    innerRadioChanged: function(value) {
      this.sendAction('changed', value);
    }
  }
});
