import Ember from 'ember';
import {
    moduleForComponent,
    test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { run } = Ember;

moduleForComponent('radio-button-group', 'RadioButtonGroupComponent', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{radio-button-group}}`);
  assert.equal(this.$('div').hasClass('ember-radio-button-group'), true, 'has ember-radio-button-group class');
});

test('it renders all given options of an array with no option selected by default', function(assert) {
  assert.expect(2);

  let optionsArray = [
    Ember.Object.create({ name: 'test 1', value: 1 }),
    Ember.Object.create({ name: 'test 2', value: 2 }),
    Ember.Object.create({ name: 'test 3', value: 3 })
  ];

  this.set('options', optionsArray);
  this.set('selection', null);

  this.render(hbs`{{radio-button-group options=options groupValue=selection}}`);

  assert.equal(this.$('div input[type="radio"]').length, 3, 'group renders 3 input controls');
  assert.equal(this.$('div label input').hasClass('checked'), false, 'no option is checked by default');
});

test('renders option label set to `name` property of element if no label is explicitly set', function(assert) {
  assert.expect(3);

  let optionsArray = [
    Ember.Object.create({ name: 'test 1', value: 1 }),
    Ember.Object.create({ name: 'test 2', value: 2 }),
    Ember.Object.create({ name: 'test 3', value: 3 })
  ];

  this.set('options', optionsArray);
  this.set('selection', null);

  this.render(hbs`{{radio-button-group options=options groupValue=selection}}`);

  assert.equal(this.$('div > label:nth-of-type(1)').text().trim(), 'test 1', 'rendering the first label with text set to name property of first element');
  assert.equal(this.$('div > label:nth-of-type(2)').text().trim(), 'test 2', 'rendering the second label with text set to name property of second element');
  assert.equal(this.$('div > label:nth-of-type(3)').text().trim(), 'test 3', 'rendering the third label with text set to name property of third element');
});

test('renders option label set to `label` property of element if label is explicitly set', function(assert) {
  assert.expect(3);

  let optionsArray = [
    Ember.Object.create({ name: 'test 1', label: 'test label 1', value: 1 }),
    Ember.Object.create({ name: 'test 2', label: 'test label 2', value: 2 }),
    Ember.Object.create({ name: 'test 3', label: 'test label 3', value: 3 })
  ];

  this.set('options', optionsArray);
  this.set('selection', null);

  this.render(hbs`{{radio-button-group options=options groupValue=selection}}`);

  assert.equal(this.$('div > label:nth-of-type(1)').text().trim(), 'test label 1', 'rendering the first label with text set to name property of first element');
  assert.equal(this.$('div > label:nth-of-type(2)').text().trim(), 'test label 2', 'rendering the second label with text set to name property of second element');
  assert.equal(this.$('div > label:nth-of-type(3)').text().trim(), 'test label 3', 'rendering the third label with text set to name property of third element');
});

test('it updates when an option is clicked, and triggers the `changed` action', function(assert) {
  assert.expect(7);

  let changedActionCallCount = 0;
  this.on('changed', function() {
    changedActionCallCount++;
  });

  let optionsArray = [
    Ember.Object.create({ name: 'test 1', label: 'test label 1', value: 1 }),
    Ember.Object.create({ name: 'test 2', label: 'test label 2', value: 2 }),
    Ember.Object.create({ name: 'test 3', label: 'test label 3', value: 3 })
  ];

  this.set('selection', 'initial-group-value');
  this.set('options', optionsArray);

  this.render(hbs`{{radio-button-group options=options groupValue=selection changed='changed'}}`);

  assert.equal(changedActionCallCount, 0);
  assert.equal(this.$('input[type="radio"]:nth-of-type(1)').prop('checked'), false, 'initialy first option is not checked');

  run(() => {
    this.$('input[type="radio"]:nth(0)').trigger('click');
  });

  assert.equal(this.$('input[type="radio"]:nth-of-type(1)').prop('checked'), true, 'updates first element property');
  assert.equal(this.$('input[type="radio"]:nth-of-type(2)').prop('checked'), undefined, 'does not update second element property');
  assert.equal(this.$('input[type="radio"]:nth-of-type(3)').prop('checked'), undefined, 'does not update third element property');
  assert.equal(this.get('selection'), 1, 'updates groupValue');

  assert.equal(changedActionCallCount, 1);
});

