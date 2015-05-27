import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

var run = Ember.run;

moduleForComponent('radio-button', 'RadioButtonComponent', {
  needs: ['template:components/labeled-radio-button']
});

test('it renders', function(assert) {
  assert.expect(2);

  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.append();
  assert.equal(component._state, 'inDOM');
});

test('begins checked when groupValue matches value', function(assert) {
  assert.expect(1);

  var component = this.subject({
    groupValue: 'chosen-value',
    value: 'chosen-value'
  });
  this.append();

  assert.equal(component.$().prop('checked'), true);
});

test('it updates when clicked, and triggers the `changed` action', function(assert) {
  assert.expect(6);

  var changedActionCallCount = 0;
  var component = this.subject({
    groupValue: 'initial-group-value',
    value: 'component-value',
    changed: 'changed',
    targetObject: Ember.Controller.createWithMixins({
      actions: {
        changed: function() {
          changedActionCallCount++;
        }
      }
    })
  });
  this.append();

  assert.equal(changedActionCallCount, 0);
  assert.equal(component.$().prop('checked'), false);

  run(function() {
    component.$().trigger('click');
  });

  assert.equal(component.$().prop('checked'), true, 'updates element property');
  assert.equal(component.get('checked'), true, 'updates component property');
  assert.equal(component.get('groupValue'), 'component-value', 'updates groupValue');

  assert.equal(changedActionCallCount, 1);
});

test('it updates when the browser change event is fired', function(assert) {
  var changedActionCallCount = 0;

  var component = this.subject({
    groupValue: 'initial-group-value',
    value: 'component-value',
    changed: 'changed',
    targetObject: Ember.Controller.createWithMixins({
      actions: {
        changed: function() {
          changedActionCallCount++;
        }
      }
    })
  });
  this.append();

  assert.equal(changedActionCallCount, 0);
  assert.equal(component.$().prop('checked'), false);

  run(function() {
    component.$().prop('checked', true).trigger('change');
  });

  assert.equal(component.get('checked'), true, 'updates component property');
  assert.equal(component.get('groupValue'), 'component-value', 'updates groupValue');
  assert.equal(changedActionCallCount, 1);
});

test('it gives the label of a wrapped checkbox a `checked` className', function(assert) {
  assert.expect(4);

  var component = this.subject({
    groupValue: 'initial-group-value',
    value: 'component-value',
    classNames: 'blue-radio',
    template: function() { return 'Blue'; }
  });
  this.append();

  assert.equal(component.$().hasClass('checked'), false);

  run(function() {
    component.set('value', 'initial-group-value');
  });

  assert.equal(component.$().hasClass('checked'), true, 'has class `checked`');
  assert.equal(component.$().hasClass('ember-radio-button'), true, 'has class `ember-radio-button`');
  assert.equal(component.$().hasClass('blue-radio'), true, 'has class `blue-radio`');
});

test('it updates when setting `value`', function(assert) {
  assert.expect(3);

  var component = this.subject({
    groupValue: 'initial-group-value',
    value: 'component-value'
  });
  this.append();

  assert.equal(component.$().prop('checked'), false);

  run(function() {
    component.set('value', 'initial-group-value');
  });

  assert.equal(component.$().prop('checked'), true);

  run(function() {
    component.set('value', 'component-value');
  });

  assert.equal(component.$().prop('checked'), false);
});

test('begins disabled when disabled is true', function(assert) {
  assert.expect(1);

  var component = this.subject({
    disabled: true
  });
  this.append();

  assert.ok(component.$().is(':disabled'));
});

test('updates disabled when the disabled attribute changes', function(assert) {
  var component = this.subject();
  this.append();

  assert.ok(component.$().is(':not(:disabled)'));

  run(function() {
    component.set('disabled', true);
  });
  assert.ok(component.$().is(':disabled'));

  run(function() {
    component.set('disabled', false);
  });
  assert.ok(component.$().is(':not(:disabled)'));
});

test('begins with the `required` and `name` attributes when specified', function(assert) {
  var component = this.subject({
    required: true,
    name: 'colors'
  });
  this.append();

  assert.ok(component.$().attr('required'));
  assert.equal(component.$().attr('name'), 'colors');
});

test('updates the `required` attribute when the property changes', function(assert) {
  var component = this.subject();
  this.append();

  assert.equal(component.$().attr('required'), null);

  run(function() {
    component.set('required', true);
  });

  assert.ok(component.$().attr('required'));

  run(function() {
    component.set('required', false);
  });

  assert.equal(component.$().attr('required'), null);
});

test('updates the `name` attribute when the property changes', function(assert) {
  var component = this.subject();
  this.append();

  assert.equal(component.$().attr('name'), null);

  run(function() {
    component.set('name', 'colors');
  });

  assert.ok(component.$().attr('name'), 'colors');
});

test('uses a layout, tagName=label, when given a template', function(assert) {
  var component = this.subject({
    template: function() { return 'Red'; }
  });

  this.append();
  assert.ok(component.$().is('label'));
  assert.ok(component.$().is('label:contains(Red)'));

  assert.equal(component.$('input[type=radio]').length, 1);
  assert.equal(component.$().hasClass('ember-radio-button'), true, 'has ember-radio-button class');
});

test('it binds attributes only to the input when used as a block', function(assert) {
  var component = this.subject({
    disabled: true,
    name: 'some-name',
    required: true,
    value: 'blue',
    groupValue: 'blue',
    template: function() { return 'Blue'; }
  });

  this.append();
  var $label = component.$();

  assert.ok($label.is('label'));
  assert.equal($label.attr('checked'), undefined);
  assert.equal($label.attr('disabled'), undefined);
  assert.equal($label.attr('name'), undefined);
  assert.equal($label.attr('required'), undefined);
  assert.equal($label.attr('type'), undefined);
  assert.equal($label.attr('value'), undefined);

  var $input = component.$('input[type=radio]');
  assert.equal($input.length, 1);
  assert.equal($input.prop('checked'), true);
  assert.equal($input.prop('disabled'), true);
  assert.equal($input.attr('name'), 'some-name');
  assert.equal($input.prop('required'), true);
  assert.equal($input.attr('value'), 'blue');
});
