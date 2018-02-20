import { run } from '@ember/runloop';
import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { alice, alice2, bob } from '../../helpers/person';

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
    {{#labeled-radio-button
      groupValue='initial-group-value'
      value=value
    }}
      Blue
    {{/labeled-radio-button}}
  `);

  assert.equal(this.$('label').hasClass('checked'), false);

  this.set('value', 'initial-group-value');

  assert.equal(this.$('label').hasClass('checked'), true);
});

test('supplying `checkedClass` gives the label a custom classname when the radio is checked', function(assert) {
  assert.expect(3);

  this.set('value', 'component-value');

  this.render(hbs`
    {{#labeled-radio-button
      groupValue='initial-group-value'
      value=value
      checkedClass="my-custom-class"
    }}
      Blue
    {{/labeled-radio-button}}
  `);

  assert.equal(this.$('label').hasClass('my-custom-class'), false, 'does not have user-provided checkedClass');
  assert.equal(this.$('label').hasClass('checked'), false, 'does not have the `checked` class');

  this.set('value', 'initial-group-value');

  assert.equal(this.$('label').hasClass('my-custom-class'), true, 'has user-provided checkedClass');
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

test('it updates when setting `value` with isEqual', function(assert) {
  assert.expect(3);

  this.set('groupValue', alice);
  this.set('value', bob);

  this.render(hbs`
    {{#labeled-radio-button
        groupValue=groupValue
        value=value
    }}
      SSN matching Alice
    {{/labeled-radio-button}}
  `);

  assert.equal(this.$('input').prop('checked'), false);

  this.set('value', alice2);

  assert.equal(this.$('input').prop('checked'), true);

  this.set('value', bob);

  assert.equal(this.$('input').prop('checked'), false);
});
