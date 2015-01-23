import Ember from 'ember';
import RadioButtonBase
  from 'ember-radio-button/components/radio-button-base';

var computed = Ember.computed;

export default RadioButtonBase.extend({
  value: null,
  groupValue: null,

  wrapInLabelIfUsedAsBlock: function() {
    if (this.get('template')) {
      this.set('tagName', 'label');
      this.set('layoutName', 'components/labeled-radio-button');

      // our change event handler becomes unused
      this.set('change', undefined);
    }
  }.on('init'),

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

