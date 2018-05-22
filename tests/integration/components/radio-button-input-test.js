import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('radio-button-input', 'Integration | Component | radio button input', {
  integration: true
});

// NOTE Be sure that this test passes in IE11!
test('reports its value on the change event', function(assert) {
  let expectedVal = 'blue';

  this.set('changed', function(val) {
    assert.equal(val, expectedVal);
  });

  this.set('value', expectedVal);

  this.render(hbs`{{radio-button-input value=value changed=(action changed)}}`);

  this.$('input').change();
});
