import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isEqual } from '@ember/utils';

export default class RadioButtonComponent extends Component {
  // value - passed in, required, the value for this radio button
  // groupValue - passed in, required, the currently selected value

  // optionally passed in:
  // disabled - boolean
  // required - boolean
  // name - string
  // radioClass - string
  // radioId - string
  // ariaLabelledby - string
  // ariaDescribedby - string

  get joinedClassNames() {
    const classNames = this.args.classNames;
    if (classNames && classNames.length && classNames.join) {
      return classNames.join(' ');
    }
    return classNames;
  }

  get checkedClass() {
    return this.args.checkedClass || 'checked';
  }

  get checked() {
    return isEqual(this.args.groupValue, this.args.value);
  }

  @action changed(newValue) {
    let changedAction = this.args.changed;

    // providing a closure action is optional
    if (changedAction) {
      changedAction(newValue);
    }
  }
}
