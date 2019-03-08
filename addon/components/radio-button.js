import { bool } from '@ember/object/computed';
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

  // polyfill hasBlock for ember versions < 1.13
  hasBlock: bool('template').readOnly(),

  joinedClassNames: computed('classNames', function() {
    let { classNames } = this;
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
      if (!this.changed || typeof this.changed !== 'function') {
        throw new Error('`changed` must be a closure action');
      }

      this.changed(newValue);
    }
  }
});
