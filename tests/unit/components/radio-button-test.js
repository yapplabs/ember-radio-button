import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

var run = Ember.run;

moduleForComponent('radio-button', 'RadioButtonComponent', {
  integration: true
});

test('begins checked when groupValue matches value', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{radio-button
        groupValue='chosen-value'
        value='chosen-value'
    }}
  `);

  assert.equal(this.$('input').prop('checked'), true);
});

test('it updates when clicked, and triggers the `changed` action', function(assert) {
  assert.expect(5);

  var changedActionCallCount = 0;
  this.on('changed', function() {
    changedActionCallCount++;
  });

  this.set('groupValue', 'initial-group-value');

  this.render(hbs`
    {{radio-button
        groupValue=groupValue
        value='component-value'
        changed='changed'
    }}
  `);

  assert.equal(changedActionCallCount, 0);
  assert.equal(this.$('input').prop('checked'), false);

  run(() => {
    this.$('input').trigger('click');
  });

  assert.equal(this.$('input').prop('checked'), true, 'updates element property');
  assert.equal(this.get('groupValue'), 'component-value', 'updates groupValue');

  assert.equal(changedActionCallCount, 1);
});

test('it updates when the browser change event is fired', function(assert) {
  var changedActionCallCount = 0;
  this.on('changed', () => {
    changedActionCallCount++;
  });

  this.set('groupValue', 'initial-group-value');

  this.render(hbs`
    {{radio-button
        groupValue=groupValue
        value='component-value'
        changed='changed'
    }}
  `);

  assert.equal(changedActionCallCount, 0);
  assert.equal(this.$('input').prop('checked'), false);

  run(() => {
    this.$('input').prop('checked', true).trigger('change');
  });

  assert.equal(this.$('input').prop('checked'), true, 'updates DOM property');
  assert.equal(this.get('groupValue'), 'component-value', 'updates groupValue');
  assert.equal(changedActionCallCount, 1);
});

test('it gives the label of a wrapped checkbox a `checked` className', function(assert) {
  assert.expect(4);

  this.set('groupValue', 'initial-group-value');
  this.set('value', 'component-value');

  this.render(hbs`
    {{#radio-button
        groupValue=groupValue
        value=value
        changed='changed'
        classNames='blue-radio'
    ~}}
      Blue
    {{~/radio-button}}
  `);

  assert.equal(this.$('label').hasClass('checked'), false);

  this.set('value', 'initial-group-value');

  assert.equal(this.$('label').hasClass('checked'), true, 'has class `checked`');
  assert.equal(this.$('label').hasClass('ember-radio-button'), true, 'has class `ember-radio-button`');
  assert.equal(this.$('label').hasClass('blue-radio'), true, 'has class `blue-radio`');
});

test('it updates when setting `value`', function(assert) {
  assert.expect(3);

  this.set('groupValue', 'initial-group-value');
  this.set('value', 'component-value');

  this.render(hbs`
    {{radio-button
        groupValue=groupValue
        value=value
    }}
  `);

  assert.equal(this.$('input').prop('checked'), false);

  this.set('value', 'initial-group-value');

  assert.equal(this.$('input').prop('checked'), true);

  this.set('value', 'component-value');

  assert.equal(this.$('input').prop('checked'), false);
});

test('begins disabled when disabled is true', function(assert) {
  assert.expect(1);

  this.render(hbs`{{radio-button disabled=true}}`);

  assert.ok(this.$('input').is(':disabled'));
});

test('updates disabled when the disabled attribute changes', function(assert) {
  this.set('isDisabled', false);

  this.render(hbs`{{radio-button disabled=isDisabled}}`);

  assert.ok(this.$('input').is(':not(:disabled)'));

  run(() => {
    this.set('isDisabled', true);
  });
  assert.ok(this.$('input').is(':disabled'));

  run(() => {
    this.set('isDisabled', false);
  });

  assert.ok(this.$('input').is(':not(:disabled)'));
});

test('begins with the `required` and `name` attributes when specified', function(assert) {
  this.render(hbs`{{radio-button required=true name='colors'}}`);

  assert.ok(this.$('input').attr('required'));
  assert.equal(this.$('input').attr('name'), 'colors');
});

test('updates the `required` attribute when the property changes', function(assert) {
  this.set('isRequired', false);

  this.render(hbs`{{radio-button required=isRequired}}`);

  assert.equal(this.$('input').attr('required'), null);

  this.set('isRequired', true);

  assert.ok(this.$('input').attr('required'));

  this.set('isRequired', false);

  assert.equal(this.$('input').attr('required'), null);
});

test('updates the `name` attribute when the property changes', function(assert) {
  this.set('name', undefined);

  this.render(hbs`{{radio-button name=name}}`);

  assert.equal(this.$('input').attr('name'), null);

  this.set('name', 'colors');

  assert.ok(this.$('input').attr('name'), 'colors');
});

test('uses a layout, tagName=label, when given a template', function(assert) {
  this.render(hbs`{{#radio-button}}Red{{/radio-button}}`);

  // skip text nodes, take the first element childNode
  var root = Ember.A(this.$()[0].childNodes).find(function(elt) { return elt.tagName; });
  var $root = $(root);

  assert.ok($root.is('label'));
  assert.ok($root.is('label:contains(Red)'));

  assert.equal(this.$('input[type=radio]').length, 1);
  assert.equal($root.hasClass('ember-radio-button'), true, 'has ember-radio-button class');
});

test('it binds attributes only to the input when used as a block', function(assert) {
  this.render(hbs`
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

  var $label = this.$('label');

  assert.ok($label.is('label'));
  assert.equal($label.attr('checked'), undefined);
  assert.equal($label.attr('disabled'), undefined);
  assert.equal($label.attr('name'), undefined);
  assert.equal($label.attr('required'), undefined);
  assert.equal($label.attr('type'), undefined);
  assert.equal($label.attr('value'), undefined);

  var $input = $label.find('input[type=radio]');
  assert.equal($input.length, 1);
  assert.equal($input.prop('checked'), true);
  assert.equal($input.prop('disabled'), true);
  assert.equal($input.attr('name'), 'some-name');
  assert.equal($input.prop('required'), true);
  assert.equal($input.attr('value'), 'blue');
});
