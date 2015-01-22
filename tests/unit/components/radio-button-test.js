import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

var run = Ember.run;

moduleForComponent('radio-button', 'RadioButtonComponent', {});

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

  component.$().trigger('click');

  equal(component.$().prop('checked'), true, 'updates element property');
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
