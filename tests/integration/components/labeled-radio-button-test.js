import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { alice, alice2, bob } from '../../helpers/person';

module('Integration | Components | Labeled Radio Button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`{{labeled-radio-button}}`);
    assert.dom('label').hasClass('ember-radio-button');
  });

  test('it gives the label of a wrapped checkbox a `checked` className', async function(assert) {
    assert.expect(2);

    this.set('value', 'component-value');

    this.changed = function() { };

    await render(hbs`
      {{#labeled-radio-button
        groupValue='initial-group-value'
        value=value
        changed=(action changed)
      }}
        Blue
      {{/labeled-radio-button}}
    `);

    assert.dom('label').doesNotHaveClass('checked');

    this.set('value', 'initial-group-value');

    assert.dom('label').hasClass('checked');
  });

  test('supplying `checkedClass` gives the label a custom classname when the radio is checked', async function(assert) {
    assert.expect(3);

    this.set('value', 'component-value');

    await render(hbs`
      {{#labeled-radio-button
        groupValue='initial-group-value'
        value=value
        checkedClass="my-custom-class"
      }}
        Blue
      {{/labeled-radio-button}}
    `);

    assert.dom('label').doesNotHaveClass('my-custom-class');
    assert.dom('label').doesNotHaveClass('checked');

    this.set('value', 'initial-group-value');

    assert.dom('label').hasClass('my-custom-class');
  });

  test('it gives the label of a wrapped radio button a `for` attribute', async function(assert) {
    assert.expect(4);

    this.set('value', 'component-value');

    this.changed = function() { };

    await render(hbs`
      {{#labeled-radio-button
        radioId='green-0'
        radioClass='my-radio-class'
        groupValue='initial-group-value'
        value=value
        changed=(action changed)
      }}
        Green
      {{/labeled-radio-button}}
    `);

    await triggerEvent('label', 'click');

    let labelEl = await find('label');
    let inputEl = await find('input');

    assert.equal(labelEl.getAttribute('for'), 'green-0', 'the label has the correct `for` attribute');
    assert.equal(inputEl.getAttribute('id'), 'green-0', 'the input has the correct `id` attribute');
    assert.dom(inputEl).hasClass('my-radio-class');
    assert.ok(inputEl.checked, 'clicking the label checks the radio');
  });

  test('it updates when setting `value` with isEqual', async function(assert) {
    assert.expect(3);

    this.set('groupValue', alice);
    this.set('value', bob);

    await render(hbs`
      {{#labeled-radio-button
          groupValue=groupValue
          value=value
      }}
        SSN matching Alice
      {{/labeled-radio-button}}
    `);

    let inputEl = await find('input');

    assert.notOk(inputEl.checked);

    this.set('value', alice2);

    assert.ok(inputEl.checked);

    this.set('value', bob);

    assert.notOk(inputEl.checked);
  });
});
