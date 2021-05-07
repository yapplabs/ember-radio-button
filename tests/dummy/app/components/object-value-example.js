import Component from '@glimmer/component';
import EmberObject from '@ember/object';

export default class ObjectValueExample extends Component {
  greenObject = { name: 'green object' };

  blueObject = { name: 'blue object' };

  reservation = EmberObject.create({
    number: 'one',
  });

  constructor() {
    super(...arguments);
    this.selectedColorObject = this.blueObject;
  }
}
