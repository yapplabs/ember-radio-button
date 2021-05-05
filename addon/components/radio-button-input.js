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
    'checkedStr:aria-checked',
  ],

  checked: computed('groupValue', 'value', function () {
    return isEqual(this.groupValue, this.value);
  }).readOnly(),

  checkedStr: computed('checked', function () {
    let checked = this.checked;

    if (typeof checked === 'boolean') {
      return checked.toString();
    }

    return null;
  }),

  invokeChangedAction() {
    let value = this.value;
    let changedAction = this.changed;

    if (typeof changedAction === 'string') {
      this.sendAction('changed', value);
      return;
    }

    if (changedAction) {
      changedAction(value);
    }
  },

  change() {
    let value = this.value;
    let groupValue = this.groupValue;

    if (groupValue !== value) {
      this.set('groupValue', value);
      run.once(this, 'invokeChangedAction');
    }
  },
});
