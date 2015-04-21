import Ember from 'ember';

export var boundAttributeKeys = [
  'checked',
  'disabled',
  'name',
  'required',
  'type',
  'value'
];

export default Ember.Component.extend({
  tagName: 'input',
  type: 'radio',
  value: null,
  defaultLayout: null,

  attributeBindings: boundAttributeKeys
});

