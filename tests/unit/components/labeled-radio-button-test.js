import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

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

test('it gives the label of a wrapped radio button a `for` attribute', function(assert) {
  assert.expect(4);

  this.set('value', 'component-value');

  this.render(hbs`
    {{#labeled-radio-button
      radioId='green-0'
      radioClass='my-radio-class'
      groupValue='initial-group-value'
      value=value
    }}
      Green
    {{/labeled-radio-button}}
  `);

  run(() => {
    this.$('label').trigger('click');
  });

  assert.equal(this.$('label').attr('for'), 'green-0', 'the label has the correct `for` attribute');
  assert.equal(this.$('input').attr('id'), 'green-0', 'the input has the correct `id` attribute');
  assert.equal(this.$('input').hasClass('my-radio-class'), true, 'the input has the right class');
  assert.equal(this.$('input:checked').length, 1, 'clicking the label checks the radio');
});
