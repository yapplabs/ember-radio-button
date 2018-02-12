import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEqual } from '@ember/utils';
import { run } from '@ember/runloop';

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
  // ariaLabelledby - string
  // ariaDescribedby - string

  defaultLayout: null, // ie8 support

  attributeBindings: [
    'autofocus',
    'checked',
    'disabled',
    'name',
    'required',
    'tabindex',
    'type',
    'value',
    'ariaLabelledby:aria-labelledby',
    'ariaDescribedby:aria-describedby'
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
