import { readOnly } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEqual } from '@ember/utils';
import layout from '../templates/components/labeled-radio-button';

export default Component.extend({
  tagName: 'label',
  layout,

  /**
   * @property radioButtonComponent
   * @type {String}
   */
  radioButtonComponent: 'radio-button',

  attributeBindings: ['for'],
  classNameBindings: ['_checkedClass'],
  classNames: ['ember-radio-button'],
  defaultLayout: null, // ie8 support

  checkedClass: 'checked',
  _checkedClass: computed('checked', 'checkedClass', function() {
    return this.get('checked') ? this.get('checkedClass') : '';
  }),
  checked: computed('groupValue', 'value', function() {
    return isEqual(this.get('groupValue'), this.get('value'));
  }).readOnly(),

  'for': readOnly('radioId'),

  actions: {
    innerRadioChanged(value) {
      this.sendAction('changed', value);
    }
  }
});
