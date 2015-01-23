import Ember from 'ember';
import RadioButtonBase
  from 'ember-radio-button/components/radio-button-base';

var computed = Ember.computed;

export default RadioButtonBase.extend({
  groupValue: null,

  checked: computed('groupValue', 'value', function(){
    return this.get('groupValue') === this.get('value');
  }).readOnly(),

  change: function() {
    var previousChecked = this.get('checked');
    var currentChecked = this.$().prop('checked');
    if (previousChecked === currentChecked) {
      return;
    }

    var value = this.get('value');
    var groupValue = this.get('groupValue');

    if (groupValue !== value){
      this.set('groupValue', value);
      Ember.run.once(this, 'sendChangedAction');
    }
  },

  sendChangedAction: function() {
    this.sendAction('changed', this.get('value'));
  }
});

