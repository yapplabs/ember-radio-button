import Ember from 'ember';

const {
  Component,
  computed,
  run
} = Ember;

export default Component.extend({
  tagName: 'input',
  type: 'radio',

  // value - required
  // groupValue - required

  // disabled - optional
  // name - optional
  // required - optional
  // radioClass - string
  // radioId - string

  defaultLayout: null, // ie8 support

  attributeBindings: [
    'checked',
    'disabled',
    'name',
    'required',
    'type',
    'value'
  ],

  checked: computed('groupValue', 'value', function() {
    return this.get('groupValue') === this.get('value');
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
