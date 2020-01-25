import Component from '@ember/component';

export default class ObjectValueComponent extends Component {
  greenObject = { name: 'green object' };
  blueObject = { name: 'blue object' };
  reservation = { number: 'one' };

  init(...args) {
    super.init(...args);
    this.set('selectedColorObject', this.get('blueObject'));
  }
}
