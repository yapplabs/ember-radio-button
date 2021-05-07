import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class TabIndexExample extends Component {
  @tracked color = 'blue';
  @tracked size = 'small';
}
