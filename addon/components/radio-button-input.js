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
    'ariaDescribedby:aria-describedby',
    'checkedStr:aria-checked'
  ],

  checked: computed('groupValue', 'value', function() {
    return isEqual(this.get('groupValue'), this.get('value'));
  }).readOnly(),

  checkedStr: computed('checked', function() {
    let checked = this.get('checked');

    if (typeof checked === 'boolean') {
      return checked.toString();
    }

    return null;
  }),

  invokeChangedAction() {
    let value = this.get('value');
    let changedAction = this.get('changed');

    if (changedAction) {
      changedAction(value);
    }
  },

  change() {
    let value = this.get('value');
    let groupValue = this.get('groupValue');

    if (groupValue !== value) {
      this.set('groupValue', value);
      run.once(this, 'invokeChangedAction');
    }
  }
});
