import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { alice, alice2, bob } from '../../helpers/person';

module('Integration | Components | Radio Button', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.actions = {};
    this.send = (actionName, ...args) =>
      this.actions[actionName].apply(this, args);
  });

  test('begins checked when groupValue matches value', async function (assert) {
    assert.expect(1);

    await render(hbs`
      <RadioButton
        @groupValue='chosen-value'
        @value='chosen-value'
      />
    `);

    assert.dom('input').isChecked();
  });

  test('it updates when clicked, and triggers the `changed` action', async function (assert) {
    assert.expect(5);

    let changedActionCallCount = 0;
    this.actions.changed = function () {
      changedActionCallCount++;
    };

    this.set('groupValue', 'initial-group-value');

    await render(hbs`
      <RadioButton
        @groupValue={{this.groupValue}}
        @value='component-value'
        @changed='changed'
      />
    `);

    assert.strictEqual(changedActionCallCount, 0);
    assert.dom('input').isNotChecked();

    await triggerEvent('input', 'click');

    assert.dom('input').isChecked('updates element property');
    assert.strictEqual(
      this.groupValue,
      'component-value',
      'updates groupValue'
    );

    assert.strictEqual(changedActionCallCount, 1);
  });

  test('it updates when the browser change event is fired', async function (assert) {
    let changedActionCallCount = 0;
    this.actions.changed = () => {
      changedActionCallCount++;
    };

    this.set('groupValue', 'initial-group-value');

    await render(hbs`
      <RadioButton
        @groupValue={{this.groupValue}}
        @value='component-value'
        @changed='changed'
      />
    `);

    assert.strictEqual(changedActionCallCount, 0);
    assert.dom('input').isNotChecked();

    await triggerEvent('input', 'click');

    assert.dom('input').isChecked('updates DOM property');
    assert.strictEqual(
      this.groupValue,
      'component-value',
      'updates groupValue'
    );
    assert.strictEqual(changedActionCallCount, 1);
  });

  test('it gives the label of a wrapped checkbox a `checked` className', async function (assert) {
    assert.expect(4);

    this.set('groupValue', 'initial-group-value');
    this.set('value', 'component-value');

    await render(hbs`
      <RadioButton
        @groupValue={{this.groupValue}}
        @value={{this.value}}
        @changed='changed'
        @classNames='blue-radio'
      >
        Blue
      </RadioButton>
    `);

    assert.dom('label').doesNotHaveClass('checked');

    this.set('value', 'initial-group-value');

    assert.dom('label').hasClass('checked');
    assert.dom('label').hasClass('ember-radio-button');
    assert.dom('label').hasClass('blue-radio');
  });

  test('providing `checkedClass` gives the label a custom classname when the radio is checked', async function (assert) {
    assert.expect(5);

    this.set('groupValue', 'initial-group-value');
    this.set('value', 'component-value');

    await render(hbs`
      <RadioButton
        @groupValue={{this.groupValue}}
        @value={{this.value}}
        @checkedClass="my-custom-class"
        @changed='changed'
        @classNames='blue-radio'
      >
        Blue
      </RadioButton>
    `);

    assert
      .dom('label')
      .doesNotHaveClass(
        'my-custom-class',
        'does not have user-provided checkedClass'
      );

    this.set('value', 'initial-group-value');

    assert
      .dom('label')
      .doesNotHaveClass('checked', 'does not have the `checked` class');
    assert
      .dom('label')
      .hasClass('my-custom-class', 'has user-provided checkedClass');
    assert
      .dom('label')
      .hasClass('ember-radio-button', 'has class `ember-radio-button`');
    assert.dom('label').hasClass('blue-radio', 'has class `blue-radio`');
  });

  test('it updates when setting `value`', async function (assert) {
    assert.expect(3);

    this.set('groupValue', 'initial-group-value');
    this.set('value', 'component-value');

    await render(hbs`
      <RadioButton
        @groupValue={{this.groupValue}}
        @value={{this.value}}
      />
    `);

    assert.dom('input').isNotChecked();

    this.set('value', 'initial-group-value');

    assert.dom('input').isChecked();

    this.set('value', 'component-value');

    assert.dom('input').isNotChecked();
  });

  test('begins disabled when disabled is true', async function (assert) {
    assert.expect(1);

    await render(hbs`<RadioButton @disabled={{true}} />`);

    assert.dom('input').isDisabled();
  });

  test('updates disabled when the disabled attribute changes', async function (assert) {
    this.set('isDisabled', false);

    await render(hbs`<RadioButton @disabled={{this.isDisabled}} />`);

    assert.dom('input').isNotDisabled();

    this.set('isDisabled', true);

    assert.dom('input').isDisabled();

    this.set('isDisabled', false);

    assert.dom('input').isNotDisabled();
  });

  test('begins with the `required` and `name` attributes when specified', async function (assert) {
    await render(hbs`<RadioButton @required={{true}} @name='colors' />`);

    assert.dom('input').isRequired();
    assert.dom('input').hasAttribute('name', 'colors');
  });

  test('updates the `required` attribute when the property changes', async function (assert) {
    this.set('isRequired', false);

    await render(hbs`<RadioButton @required={{this.isRequired}} />`);

    assert.dom('input').isNotRequired();

    this.set('isRequired', true);

    assert.dom('input').isRequired();

    this.set('isRequired', false);

    assert.dom('input').isNotRequired();
  });

  test('updates the `name` attribute when the property changes', async function (assert) {
    this.set('name', undefined);

    await render(hbs`<RadioButton @name={{this.name}} />`);

    assert.dom('input').hasNoAttribute('name');

    this.set('name', 'colors');

    assert.dom('input').hasAttribute('name', 'colors');
  });

  test('uses a layout, tagName=label, when given a template', async function (assert) {
    await render(hbs`<RadioButton>Red</RadioButton>`);

    assert.dom('label').hasText('Red');
    assert.dom('input[type="radio"]').exists({ count: 1 });
    assert.dom('.ember-radio-button').exists();
  });

  test('it binds attributes only to the input when used as a block', async function (assert) {
    await render(hbs`
      <RadioButton
        @disabled={{true}}
        @name='some-name'
        @required={{true}}
        @value='blue'
        @groupValue='blue'
      >
        Blue
      </RadioButton>
    `);

    assert.dom('.ember-radio-button').hasTagName('label', 'is a label');
    assert.dom('.ember-radio-button').isNotChecked();

    assert
      .dom('.ember-radio-button')
      .hasNoAttribute('name', 'does not have name set');
    assert
      .dom('.ember-radio-button')
      .hasNoAttribute('required', 'is not required');
    assert
      .dom('.ember-radio-button')
      .hasNoAttribute('type', 'does not have attribute type');
    assert
      .dom('.ember-radio-button')
      .hasNoAttribute('value', 'does not have attribute value');

    const inputSelector = '.ember-radio-button input[type="radio"]';

    assert.dom(inputSelector).exists();
    assert.dom(inputSelector).isChecked();
    assert.dom(inputSelector).isDisabled();
    assert.dom(inputSelector).hasAttribute('name', 'some-name', 'has name set');
    assert.dom(inputSelector).isRequired('is required');
    assert.dom(inputSelector).hasValue('blue');
  });

  test('it checks the input when the label is clicked and has a `for` attribute', async function (assert) {
    assert.expect(4);

    this.set('value', 'component-value');

    await render(hbs`
      <RadioButton
        @radioId='green-0'
        @radioClass='my-radio-class'
        @groupValue='initial-group-value'
        @value={{this.value}}
      >
        Green
      </RadioButton>
    `);

    await triggerEvent('label', 'click');

    assert
      .dom('label')
      .hasAttribute(
        'for',
        'green-0',
        'the label has the correct `for` attribute'
      );
    assert
      .dom('input')
      .hasAttribute(
        'id',
        'green-0',
        'the input has the correct `id` attribute'
      );

    assert.dom('input').hasClass('my-radio-class');
    assert.dom('input').isChecked('clicking the label checks the radio');
  });

  test('it updates when setting `value` with isEqual', async function (assert) {
    assert.expect(3);

    this.set('groupValue', alice);
    this.set('value', bob);

    await render(hbs`
      <RadioButton
        @groupValue={{this.groupValue}}
        @value={{this.value}}
      />
    `);

    assert.dom('input').isNotChecked();

    this.set('value', alice2);

    assert.dom('input').isChecked();

    this.set('value', bob);

    assert.dom('input').isNotChecked();
  });

  test('it binds `aria-labelledby` when specified', async function (assert) {
    assert.expect(1);

    this.set('ariaLabelledby', 'green-label');

    await render(hbs`
      <RadioButton
        @ariaLabelledby={{this.ariaLabelledby}}
        @groupValue='initial-group-value'
        @value='value'
      >
        Green
      </RadioButton>
    `);

    assert.dom('input').hasAttribute('aria-labelledby', 'green-label');
  });

  test('it binds `aria-describedby` when specified', async function (assert) {
    assert.expect(1);

    this.set('ariaDescribedby', 'green-label');

    await render(hbs`
      <RadioButton
        @ariaDescribedby={{this.ariaDescribedby}}
        @groupValue='initial-group-value'
        @value='value'
      >
        Green
      </RadioButton>
    `);

    assert.dom('input').hasAttribute('aria-describedby', 'green-label');
  });
});
