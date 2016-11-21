import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: 'label',
  attributeBindings: ['for'],
  classNameBindings: ['checked'],
  classNames: ['ember-radio-button'],
  defaultLayout: null, // ie8 support

  checked: computed('groupValue', 'value', function() {
    return this.get('groupValue') === this.get('value');
  }).readOnly(),

  'for': computed.readOnly('radioId'),

  actions: {
    innerRadioChanged(value) {
      this.sendAction('changed', value);
    },
    innerRadioFocusIn() {
      this.sendAction('focus-in');
    },
    innerRadioFocusOut() {
      this.sendAction('focus-out');
    }
  }
});
