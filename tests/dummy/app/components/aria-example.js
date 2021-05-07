import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AriaExample extends Component {
  @tracked color = 'red';

  @action colorChanged(color) {
    this.color = color;
  }
}
