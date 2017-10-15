import Ember from 'ember';

const {
  Component,
  computed,
  isEqual,
  run
} = Ember;

export default Component.extend({
  tagName: 'input',
  type: 'radio',

  // value - required
  // groupValue - required

  // autofocus - boolean
  // disabled - optional
  // name - optional
  // required - optional
  // radioClass - string
  // radioId - string
  // tabindex - number

  defaultLayout: null, // ie8 support

  attributeBindings: [
    'autofocus',
    'checked',
    'disabled',
    'name',
    'required',
    'tabindex',
    'type',
    'value'
  ],

  checked: computed('groupValue', 'value', function() {
    return isEqual(this.get('groupValue'), this.get('value'));
  }).readOnly(),

  sendChangedAction() {
    this.sendAction('changed', this.get('value'));
  },

  change() {
    let value = this.get('value');
    let groupValue = this.get('groupValue');

    if (groupValue !== value) {
      this.set('groupValue', value); // violates DDAU
      run.once(this, 'sendChangedAction');
    }
  }
});
