import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AutofocusExample extends Component {
  @tracked color = 'green';

  @action colorChanged(color) {
    this.color = color;
  }
}
