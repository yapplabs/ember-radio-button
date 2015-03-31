import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

var run = Ember.run;

moduleForComponent('labeled-radio-button', 'LabeledRadioButtonComponent', {
  needs: ['component:radio-button']
});

test('it renders', function() {
  expect(2);

  var component = this.subject();
  equal(component._state, 'preRender');

  this.append();
  equal(component._state, 'inDOM');
});

test('it gives the label of a wrapped checkbox a `checked` className', function() {
  expect(2);

  var component = this.subject({
    groupValue: 'initial-group-value',
    value: 'component-value',
    template: function() { return 'Blue'; }
  });
  this.append();

  equal(component.$().hasClass('checked'), false);

  run(function() {
    component.set('value', 'initial-group-value');
  });

  equal(component.$().hasClass('checked'), true);
});
