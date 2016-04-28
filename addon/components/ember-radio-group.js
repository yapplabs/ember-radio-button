import Ember from 'ember';
import layout from '../templates/components/ember-radio-group';

let EmberRadioGroup = Ember.Component.extend({
  layout
});

EmberRadioGroup.reopenClass({
  positionalParams: ['groupValue']
});

export default EmberRadioGroup;
