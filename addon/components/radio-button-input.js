import Component from '@glimmer/component';
import { once } from '@ember/runloop';
import { action } from '@ember/object';

export default class RadioButtonInputComponent extends Component {
  get checkedStr() {
    const checked = this.args.checked;

    if (typeof checked === 'boolean') {
      return checked.toString();
    }

    return null;
  }

  @action change() {
    if (this.args.groupValue !== this.args.value) {
      // this.set('groupValue', value);
      once(this.args, 'changed', this.args.value);
    }
  }
}
