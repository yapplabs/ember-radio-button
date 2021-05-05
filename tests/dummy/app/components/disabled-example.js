import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DisabledExample extends Component {
  @tracked number = 'one';
  @tracked numbersDisabled = true;

  @action colorChanged(color) {
    this.color = color;
  }
}
