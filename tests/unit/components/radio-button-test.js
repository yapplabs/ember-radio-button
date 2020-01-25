import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { click, find, render, triggerEvent } from '@ember/test-helpers';
import td from 'testdouble';
import { alice, alice2, bob } from '../../helpers/person';

module('Integration | Components | RadioButtonComponent', function(hooks) {
  setupRenderingTest(hooks);

  test('begins checked when groupValue matches value', async function(assert) {
    await render(hbs`
      {{radio-button
          groupValue='chosen-value'
          value='chosen-value'
      }}
    `);

    assert.dom('input').isChecked();
  });

  test('it updates when clicked, and triggers the `changed` action', async function(assert) {
    this.changed = td.function();
    this.set('groupValue', 'initial-group-value');

    await render(hbs`
      {{radio-button
          groupValue=groupValue
          value='component-value'
          changed=this.changed
      }}
    `);

    assert.verify(this.changed(), { ignoreExtraArgs: true, times: 0 });
    assert.dom('input').isNotChecked();

    await click('input');

    assert.dom('input').isChecked();
    assert.equal(this.get('groupValue'), 'component-value', 'updates groupValue');

    assert.verify(this.changed('component-value'), { times: 1 });
  });

  test('when no action is passed, updating does not error', async function(assert) {
    this.set('groupValue', 'initial-group-value');

    await render(hbs`
      {{radio-button
          groupValue=groupValue
          value='component-value'
      }}
    `);

    assert.dom('input').isNotChecked();

    await click('input')

    assert.dom('input').isChecked();
    assert.equal(this.get('groupValue'), 'component-value', 'updates groupValue');
  });

  test('it updates when the browser change event is fired', async function(assert) {
    this.changed = td.function();

    this.set('groupValue', 'initial-group-value');

    await render(hbs`
      {{radio-button
          groupValue=groupValue
          value='component-value'
          changed=this.changed
      }}
    `);

    assert.verify(this.changed(), { ignoreExtraArgs: true, times: 0 });
    assert.dom('input').isNotChecked();

    const input = find('input');
    input.checked = true;
    await triggerEvent(input, 'change');

    assert.dom('input').isChecked()
    assert.equal(this.get('groupValue'), 'component-value', 'updates groupValue');
    assert.verify(this.changed('component-value'), { times: 1 });
  });

  test('it gives the label of a wrapped checkbox a `checked` className', async function(assert) {
    this.set('groupValue', 'initial-group-value');
    this.set('value', 'component-value');

    await render(hbs`
      {{#radio-button
          groupValue=groupValue
          value=value
          classNames='blue-radio'
      }}
        Blue
      {{/radio-button}}
    `);

    assert.dom('label').doesNotHaveClass('checked');

    this.set('value', 'initial-group-value');

    assert.dom('label').hasClass('checked');
    assert.dom('label').hasClass('ember-radio-button');
    assert.dom('label').hasClass('blue-radio');
  });

  test('providing `checkedClass` gives the label a custom classname when the radio is checked', async function(assert) {
    this.set('groupValue', 'initial-group-value');
    this.set('value', 'component-value');

    await render(hbs`
      {{#radio-button
          groupValue=groupValue
          value=value
          checkedClass="my-custom-class"
          classNames='blue-radio'
      }}
        Blue
      {{/radio-button}}
    `);

    assert.dom('label').doesNotHaveClass('my-custom-class');

    this.set('value', 'initial-group-value');

    assert.dom('label').doesNotHaveClass('checked');
    assert.dom('label').hasClass('my-custom-class');
    assert.dom('label').hasClass('ember-radio-button');
    assert.dom('label').hasClass('blue-radio');
  });

  test('it updates when setting `value`', async function(assert) {
    this.set('groupValue', 'initial-group-value');
    this.set('value', 'component-value');

    await render(hbs`
      {{radio-button
          groupValue=groupValue
          value=value
      }}
    `);

    assert.dom('input').isNotChecked();

    this.set('value', 'initial-group-value');

    assert.dom('input').isChecked();

    this.set('value', 'component-value');

    assert.dom('input').isNotChecked();
  });

  test('setting the `disabled` attribute', async function(assert) {
    this.set('isDisabled', false);

    await render(hbs`{{radio-button disabled=isDisabled}}`);

    assert.dom('input').isNotDisabled();

    this.set('isDisabled', true);

    assert.dom('input').isDisabled();

    this.set('isDisabled', false);

    assert.dom('input').isNotDisabled();
  });

  test('setting the `required` attribute', async function(assert) {
    this.set('isRequired', false);

    await render(hbs`{{radio-button required=isRequired}}`);

    assert.dom('input').doesNotHaveAttribute('required');

    this.set('isRequired', true);

    assert.dom('input').hasAttribute('required');

    this.set('isRequired', false);

    assert.dom('input').doesNotHaveAttribute('required');
  });

  test('setting the `name` attribute', async function(assert) {
    this.set('name', undefined);

    await render(hbs`{{radio-button name=name}}`);

    assert.dom('input').doesNotHaveAttribute('name');

    this.set('name', 'colors');

    assert.dom('input').hasAttribute('name', 'colors');
  });

  test('it binds attributes only to the input when used as a block', async function(assert) {
    await render(hbs`
      {{#radio-button
        disabled=true
        name='some-name'
        required=true
        value='blue'
        groupValue='blue'
      ~}}
        Blue
      {{~/radio-button}}
    `);

    assert.dom('label').doesNotHaveAttribute('checked');
    assert.dom('label').doesNotHaveAttribute('disabled');
    assert.dom('label').doesNotHaveAttribute('name');
    assert.dom('label').doesNotHaveAttribute('required');
    assert.dom('label').doesNotHaveAttribute('type');
    assert.dom('label').doesNotHaveAttribute('value');

    assert.dom('input').isChecked();
    assert.dom('input').isDisabled();
    assert.dom('input').hasAttribute('name', 'some-name');
    assert.dom('input').hasAttribute('required')
    assert.dom('input').hasAttribute('value', 'blue')
  });

  test('it checks the input when the label is clicked and has a `for` attribute', async function(assert) {
    this.set('value', 'component-value');

    await render(hbs`
      {{#radio-button
        radioId='green-0'
        radioClass='my-radio-class'
        groupValue='initial-group-value'
        value=value
      }}
        Green
      {{/radio-button}}
    `);

    await click('label');

    assert.dom('label').hasAttribute('for', 'green-0');
    assert.dom('input').hasAttribute('id', 'green-0');
    assert.dom('input').hasClass('my-radio-class');
    assert.dom('input').isChecked();
  });

  test('it updates when setting `value` with isEqual', async function(assert) {
    this.set('groupValue', alice);
    this.set('value', bob);

    await render(hbs`
      {{radio-button
          groupValue=groupValue
          value=value
      }}
    `);

    assert.dom('input').isNotChecked();

    this.set('value', alice2);

    assert.dom('input').isChecked();

    this.set('value', bob);

    assert.dom('input').isNotChecked();
  });

  test('it binds `aria-labelledby` when specified', async function(assert) {
    this.set('ariaLabelledby', 'green-label');

    await render(hbs`
      {{#radio-button
        ariaLabelledby=ariaLabelledby
        groupValue='initial-group-value'
        value='value'
      }}
        Green
      {{/radio-button}}
    `);

    assert.dom('input').hasAttribute('aria-labelledby', 'green-label');
  });

  test('it binds `aria-describedby` when specified', async function(assert) {
    this.set('ariaDescribedby', 'green-label');

    await render(hbs`
      {{#radio-button
        ariaDescribedby=ariaDescribedby
        groupValue='initial-group-value'
        value='value'
      }}
        Green
      {{/radio-button}}
    `);

    assert.dom('input').hasAttribute('aria-describedby', 'green-label');
  });
});
