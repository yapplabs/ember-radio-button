import Ember from 'ember';
import layout from '../templates/components/ember-radio-group';

let EmberRadioGroup = Ember.Component.extend({
  layout,
  // changed - action, passed in
  tagName: ''
});

EmberRadioGroup.reopenClass({
  positionalParams: ['groupValue']
});

export default EmberRadioGroup;
