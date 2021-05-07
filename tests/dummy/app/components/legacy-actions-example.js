import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LegacyActionsExample extends Component {
  @tracked color = 'maroon';

  @action colorChanged(color) {
    this.color = color;
    window.alert(`Color changed to ${color}`);
  }
}
