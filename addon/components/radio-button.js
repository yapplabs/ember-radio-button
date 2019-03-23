import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEqual } from '@ember/utils';
import layout from '../templates/components/radio-button';

export default Component.extend({
  tagName: '',
  layout,

  // value - passed in, required, the value for this radio button
  // groupValue - passed in, required, the currently selected value

  // optionally passed in:
  // disabled - boolean
  // required - boolean
  // name - string
  // radioClass - string
  // radioId - string
  // ariaLabelledby - string
  // ariaDescribedby - string

  joinedClassNames: computed('classNames', function() {
    let classNames = this.get('classNames');
    if (classNames && classNames.length && classNames.join) {
      return classNames.join(' ');
    }
    return classNames;
  }),

  // is this needed here or just on radio-button-input?
  defaultLayout: null, // ie8 support

  checkedClass: 'checked',

  checked: computed('groupValue', 'value', function() {
    return isEqual(this.get('groupValue'), this.get('value'));
  }).readOnly(),

  actions: {
    changed(newValue) {
      let changedAction = this.get('changed');

      // support legacy actions
      if (typeof changedAction === 'string') {
        this.sendAction('changed', newValue);
        return;
      }

      // providing a closure action is optional
      if (changedAction) {
        changedAction(newValue);
      }
    }
  }
});
