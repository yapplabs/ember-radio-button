import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

var run = Ember.run;

moduleForComponent('labeled-radio-button', 'LabeledRadioButtonComponent', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{labeled-radio-button}}`);
  assert.equal(this.$('label').hasClass('ember-radio-button'), true, 'has ember-radio-button class');
});

test('it gives the label of a wrapped checkbox a `checked` className', function(assert) {
  assert.expect(2);

  this.set('value', 'component-value');

  this.render(hbs`
    {{#radio-button
      groupValue='initial-group-value'
      value=value
    }}
      Blue
    {{/radio-button}}
  `);

  assert.equal(this.$('label').hasClass('checked'), false);

  this.set('value', 'initial-group-value');

  assert.equal(this.$('label').hasClass('checked'), true);
});

test('it gives the label of a wrapped checkbox a `disabled` className', function() {
  expect(2);

  var component = this.subject({
    template: function() { return 'Blue'; }
  });
  this.append();
  equal(component.$().hasClass('disabled'), false);

  run(function() {
    component.set('disabled', true);
  });

  equal(component.$().hasClass('disabled'), true);
});
