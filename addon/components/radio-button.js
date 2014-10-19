import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: 'radio-button',
  classNameBindings: 'checked',
  checkedWhen: null,
  value: null,
  scheduleChangedAction: function(){
    Ember.run.schedule('actions', this, function(){
      this.sendAction('changed', this.get('value'));
    });
  },
  checked: function(){
    return this.get('value') === this.get('checkedWhen');
  }.property('value', 'checkedWhen'),
  click: function(){
    var checkedWhen = this.get('checkedWhen');
    var value = this.get('value');
    this.set('value', checkedWhen);
    if (value !== checkedWhen){
      this.scheduleChangedAction();
    }
  }
});

