import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class RequiredExample extends Component {
  @tracked noDefault = '';
}
