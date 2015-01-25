import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

var run = Ember.run;

moduleForComponent('radio-button', 'RadioButtonComponent', {
  needs: ['template:components/labeled-radio-button']
});

test('it renders', function() {
  expect(2);

  var component = this.subject();
  equal(component._state, 'preRender');

  this.append();
  equal(component._state, 'inDOM');
});

test('begins checked when groupValue matches value', function() {
  expect(1);

  var component = this.subject({
    groupValue: 'chosen-value',
    value: 'chosen-value'
  });
  this.append();

  equal(component.$().prop('checked'), true);
});

test('it updates when clicked, and triggers the `changed` action', function() {
  expect(6);

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

  equal(changedActionCallCount, 0);
  equal(component.$().prop('checked'), false);

  run(function() {
    component.$().trigger('click');
  });

  equal(component.$().prop('checked'), true, 'updates element property');
  equal(component.get('checked'), true, 'updates component property');
  equal(component.get('groupValue'), 'component-value', 'updates groupValue');

  equal(changedActionCallCount, 1);
});

test('it updates when the browser change event is fired', function() {
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

  equal(changedActionCallCount, 0);
  equal(component.$().prop('checked'), false);

  run(function() {
    component.$().prop('checked', true).trigger('change');
  });

  equal(component.get('checked'), true, 'updates component property');
  equal(component.get('groupValue'), 'component-value', 'updates groupValue');
  equal(changedActionCallCount, 1);
});

test('it updates when setting `value`', function() {
  expect(3);

  var component = this.subject({
    groupValue: 'initial-group-value',
    value: 'component-value'
  });
  this.append();

  equal(component.$().prop('checked'), false);

  run(function() {
    component.set('value', 'initial-group-value');
  });

  equal(component.$().prop('checked'), true);

  run(function() {
    component.set('value', 'component-value');
  });

  equal(component.$().prop('checked'), false);
});

test('begins disabled when disabled is true', function() {
  expect(1);

  var component = this.subject({
    disabled: true
  });
  this.append();

  ok(component.$().is(':disabled'));
});

test('updates disabled when the disabled attribute changes', function() {
  var component = this.subject();
  this.append();

  ok(component.$().is(':not(:disabled)'));

  run(function() {
    component.set('disabled', true);
  });
  ok(component.$().is(':disabled'));

  run(function() {
    component.set('disabled', false);
  });
  ok(component.$().is(':not(:disabled)'));
});

test('begins with the `required` and `name` attributes when specified', function() {
  var component = this.subject({
    required: true,
    name: 'colors'
  });
  this.append();

  ok(component.$().attr('required'));
  equal(component.$().attr('name'), 'colors');
});

test('updates the `required` attribute when the property changes', function() {
  var component = this.subject();
  this.append();

  equal(component.$().attr('required'), null);

  run(function() {
    component.set('required', true);
  });

  ok(component.$().attr('required'));

  run(function() {
    component.set('required', false);
  });

  equal(component.$().attr('required'), null);
});

test('updates the `name` attribute when the property changes', function() {
  var component = this.subject();
  this.append();

  equal(component.$().attr('name'), null);

  run(function() {
    component.set('name', 'colors');
  });

  ok(component.$().attr('name'), 'colors');
});

test('uses a layout, tagName=label, when given a template', function() {
  var component = this.subject({
    template: function() { return 'Red'; }
  });

  this.append();
  ok(component.$().is('label'));
  ok(component.$().is('label:contains(Red)'));

  equal(component.$('input[type=radio]').length, 1);
});
