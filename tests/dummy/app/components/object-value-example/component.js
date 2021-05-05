import Component from '@ember/component';
import EmberObject from '@ember/object';

export default Component.extend({
  greenObject: { name: 'green object' },
  blueObject: { name: 'blue object' },
  reservation: EmberObject.create({
    number: 'one',
  }),
  init() {
    this._super();
    this.set('selectedColorObject', this.blueObject);
  },
});
