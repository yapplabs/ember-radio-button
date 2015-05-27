import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

var run = Ember.run;

moduleForComponent('labeled-radio-button', 'LabeledRadioButtonComponent', {
  needs: ['component:radio-button']
});

test('it renders', function(assert) {
  assert.expect(3);

  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
  assert.equal(component.$().hasClass('ember-radio-button'), true, 'has ember-radio-button class');
});

test('it gives the label of a wrapped checkbox a `checked` className', function(assert) {
  assert.expect(2);

  var component = this.subject({
    groupValue: 'initial-group-value',
    value: 'component-value',
    template: function() { return 'Blue'; }
  });
  this.render();

  assert.equal(component.$().hasClass('checked'), false);

  run(function() {
    component.set('value', 'initial-group-value');
  });

  assert.equal(component.$().hasClass('checked'), true);
});
