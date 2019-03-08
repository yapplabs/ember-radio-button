import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { alice, alice2, bob } from '../../helpers/person';

module('Integration | Components | Radio Button', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('begins checked when groupValue matches value', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{radio-button
          groupValue='chosen-value'
          value='chosen-value'
      }}
    `);

    let inputEl = await find('input');

    assert.ok(inputEl.checked);
  });

  test('it updates when clicked, and triggers the `changed` action', async function(assert) {
    assert.expect(5);

    let changedActionCallCount = 0;
    this.actions.changed = function() {
      changedActionCallCount++;
    };

    this.set('groupValue', 'initial-group-value');

    await render(hbs`
      {{radio-button
          groupValue=groupValue
          value='component-value'
          changed=(action 'changed')
      }}
    `);

    let inputEl = await find('input');

    assert.equal(changedActionCallCount, 0);
    assert.notOk(inputEl.checked);

    await triggerEvent('input', 'click');

    assert.ok(inputEl.checked, 'updates element property');
    assert.equal(this.get('groupValue'), 'component-value', 'updates groupValue');

    assert.equal(changedActionCallCount, 1);
  });

  test('it updates when the browser change event is fired', async function(assert) {
    let changedActionCallCount = 0;
    this.actions.changed = () => {
      changedActionCallCount++;
    };

    this.set('groupValue', 'initial-group-value');

    await render(hbs`
      {{radio-button
          groupValue=groupValue
          value='component-value'
          changed=(action 'changed')
      }}
    `);

    let inputEl = await find('input');

    assert.equal(changedActionCallCount, 0);
    assert.notOk(inputEl.checked);

    await triggerEvent(inputEl, 'click');

    assert.ok(inputEl.checked, 'updates DOM property');
    assert.equal(this.get('groupValue'), 'component-value', 'updates groupValue');
    assert.equal(changedActionCallCount, 1);
  });

  test('it gives the label of a wrapped checkbox a `checked` className', async function(assert) {
    assert.expect(4);

    this.set('groupValue', 'initial-group-value');
    this.set('value', 'component-value');

    this.actions.changed = function() {};

    await render(hbs`
      {{#radio-button
          groupValue=groupValue
          value=value
          changed=(action 'changed')
          classNames='blue-radio'
      ~}}
        Blue
      {{~/radio-button}}
    `);

    assert.dom('label').doesNotHaveClass('checked');

    this.set('value', 'initial-group-value');

    assert.dom('label').hasClass('checked');
    assert.dom('label').hasClass('ember-radio-button');
    assert.dom('label').hasClass('blue-radio');
  });

  test('providing `checkedClass` gives the label a custom classname when the radio is checked', async function(assert) {
    assert.expect(5);

    this.set('groupValue', 'initial-group-value');
    this.set('value', 'component-value');

    this.actions.changed = function() { };

    await render(hbs`
      {{#radio-button
          groupValue=groupValue
          value=value
          checkedClass="my-custom-class"
          changed=(action 'changed')
          classNames='blue-radio'
      ~}}
        Blue
      {{~/radio-button}}
    `);

    assert.dom('label').doesNotHaveClass('my-custom-class', 'does not have user-provided checkedClass');

    this.set('value', 'initial-group-value');

    assert.dom('label').doesNotHaveClass('checked', 'does not have the `checked` class');
    assert.dom('label').hasClass('my-custom-class', 'has user-provided checkedClass');
    assert.dom('label').hasClass('ember-radio-button', 'has class `ember-radio-button`');
    assert.dom('label').hasClass('blue-radio', 'has class `blue-radio`');
  });

  test('it updates when setting `value`', async function(assert) {
    assert.expect(3);

    this.set('groupValue', 'initial-group-value');
    this.set('value', 'component-value');

    await render(hbs`
      {{radio-button
          groupValue=groupValue
          value=value
      }}
    `);

    let inputEl = await find('input');

    assert.notOk(inputEl.checked);

    this.set('value', 'initial-group-value');

    assert.ok(inputEl.checked);

    this.set('value', 'component-value');

    assert.notOk(inputEl.checked);
  });

  test('begins disabled when disabled is true', async function(assert) {
    assert.expect(1);

    await render(hbs`{{radio-button disabled=true}}`);

    assert.dom('input').isDisabled();
  });

  test('updates disabled when the disabled attribute changes', async function(assert) {
    this.set('isDisabled', false);

    await render(hbs`{{radio-button disabled=isDisabled}}`);

    assert.dom('input').isNotDisabled();

    this.set('isDisabled', true);

    assert.dom('input').isDisabled();

    this.set('isDisabled', false);

    assert.dom('input').isNotDisabled();
  });

  test('begins with the `required` and `name` attributes when specified', async function(assert) {
    await render(hbs`{{radio-button required=true name='colors'}}`);

    let inputEl = await find('input');

    assert.ok(inputEl.hasAttribute('required'));
    assert.equal(inputEl.name, 'colors');
  });

  test('updates the `required` attribute when the property changes', async function(assert) {
    this.set('isRequired', false);

    await render(hbs`{{radio-button required=isRequired}}`);

    let inputEl = await find('input');

    assert.notOk(inputEl.hasAttribute('required'));

    this.set('isRequired', true);

    assert.ok(inputEl.hasAttribute('required'));

    this.set('isRequired', false);

    assert.notOk(inputEl.hasAttribute('required'));
  });

  test('updates the `name` attribute when the property changes', async function(assert) {
    this.set('name', undefined);

    await render(hbs`{{radio-button name=name}}`);

    let inputEl = await find('input');

    assert.equal(inputEl.name, '');

    this.set('name', 'colors');

    assert.ok(inputEl.name, 'colors');
  });

  test('uses a layout, tagName=label, when given a template', async function(assert) {
    await render(hbs`{{#radio-button}}Red{{/radio-button}}`);

    assert.dom('label').hasText('Red');
    assert.dom('input[type="radio"]').exists({ count: 1 });
    assert.dom('.ember-radio-button').exists();
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

    let radioEl = await find('.ember-radio-button');

    assert.equal(radioEl.tagName, 'LABEL', 'is a label');
    assert.notOk(radioEl.checked, 'is not checked');
    assert.notOk(radioEl.getAttribute('disabled'), 'does not have attribute disabled');
    assert.notOk(radioEl.name, 'does not have name set');
    assert.notOk(radioEl.getAttribute('required'), 'is not required');
    assert.notOk(radioEl.getAttribute('type'), 'does not have attribute type');
    assert.notOk(radioEl.getAttribute('value'), 'does not have attriubute value');

    let inputSelector = '.ember-radio-button input[type="radio"]';
    let inputEl = await find(inputSelector);

    assert.dom(inputSelector).exists();
    assert.ok(inputEl.checked, 'is checked');
    assert.dom(inputSelector).isDisabled();
    assert.equal(inputEl.name, 'some-name', 'has name set');
    assert.ok(inputEl.hasAttribute('required'), 'is required');
    assert.dom(inputSelector).hasValue('blue');
  });

  test('it checks the input when the label is clicked and has a `for` attribute', async function(assert) {
    assert.expect(4);

    this.set('value', 'component-value');

    this.actions.changed = function() { };

    await render(hbs`
      {{#radio-button
        radioId='green-0'
        radioClass='my-radio-class'
        groupValue='initial-group-value'
        value=value
        changed=(action 'changed')
      }}
        Green
      {{/radio-button}}
    `);

    await triggerEvent('label', 'click');

    let inputEl = await find('input');
    let labelEl = await find('label');

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
      {{radio-button
          groupValue=groupValue
          value=value
      }}
    `);

    let inputEl = await find('input');

    assert.notOk(inputEl.checked, 'is not checked');

    this.set('value', alice2);

    assert.ok(inputEl.checked, 'is checked');

    this.set('value', bob);

    assert.notOk(inputEl.checked, 'is not checked');
  });

  test('it binds `aria-labelledby` when specified', async function(assert) {
    assert.expect(1);

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

    let inputEl = await find('input');

    assert.equal(inputEl.getAttribute('aria-labelledby'), 'green-label');
  });

  test('it binds `aria-describedby` when specified', async function(assert) {
    assert.expect(1);

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

    let inputEl = await find('input');

    assert.equal(inputEl.getAttribute('aria-describedby'), 'green-label');
  });
});
