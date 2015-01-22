import Ember from 'ember';

var computed = Ember.computed;

export default Ember.Component.extend({
  tagName: 'input',
  type: 'radio',
  value: null,
  groupValue: null,

  attributeBindings: [
    'type',
    'checked',
    'value',
    'disabled',
    'required',
    'name'
  ],

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

    this.set('groupValue', value);

    if (groupValue !== value){
      Ember.run.once(this, 'sendChangedAction');
    }
  },

  sendChangedAction: function() {
    this.sendAction('changed', this.get('value'));
  }
});

