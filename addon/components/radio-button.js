import Ember from 'ember';
import RadioButtonBase
  from 'ember-radio-button/components/radio-button-base';
import {
  boundAttributeKeys
} from 'ember-radio-button/components/radio-button-base';

var computed = Ember.computed;
var on = Ember.on;

export default RadioButtonBase.extend({
  value: null,
  groupValue: null,

  wrapInLabelIfUsedAsBlock: on('init', function() {
    if (this.get('template')) {
      this.set('tagName', 'label');
      this.set('layoutName', 'components/labeled-radio-button');

      // our change event handler becomes unused
      this.set('change', undefined);

      // don't bind name, type, etc to the label
      var originalAttrs = this.get('attributeBindings');
      var updatedAttrs = Ember.A(Ember.copy(originalAttrs)).removeObjects(
        boundAttributeKeys
      );
      this.set('attributeBindings', updatedAttrs);
      this.get('classNameBindings').pushObject('checked');
      this.get('classNames').pushObject('ember-radio-button');
    }
  }),

  checked: computed('groupValue', 'value', function(){
    return this.get('groupValue') === this.get('value');
  }).readOnly(),

  change: function() {
    var value = this.get('value');
    var groupValue = this.get('groupValue');

    if (groupValue !== value){
      this.set('groupValue', value);
      Ember.run.once(this, 'sendChangedAction');
    }
  },

  sendChangedAction: function() {
    this.sendAction('changed', this.get('value'));
  },

  actions: {
    // when used as a block, our layout wraps a non-block
    // radio-button which maps changed to this
    innerRadioChanged: function(value) {
      this.sendAction('changed', value);
    }
  }
});

