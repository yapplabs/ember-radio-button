import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IdAndClassExample extends Component {
  @tracked color = 'purple';

  @action colorChanged(color) {
    this.color = color;
    window.alert(`Color changed to ${color}`);
  }
}
