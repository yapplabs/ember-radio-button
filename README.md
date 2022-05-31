# ember-radio-button [![Build Status](https://travis-ci.org/yapplabs/ember-radio-button.svg?branch=master)](https://travis-ci.org/yapplabs/ember-radio-button) [![Ember Observer Score](https://emberobserver.com/badges/ember-radio-button.svg)](https://emberobserver.com/addons/ember-radio-button)

This addon provides a `radio-button` component.

A `radio-button` will be in a checked state when the `value` property matches the `groupValue` property.
`value` should be unique per radio-button, while the same `groupValue` should be provided to each
`radio-button` in the group.

Clicking on a `radio-button` will set `groupValue` to its `value`.

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above

## Usage
### Block Form

The block form emits a label wrapping the input element and any elements passed to the block.

**Template:**

```javascript
<RadioButton
  @value="blue"
  @groupValue=color
  @changed={{this.colorChanged}}
>
  <span>Blue</span>
</RadioButton>

/* results in */
<label id="ember346" class="ember-view ember-radio-button">
  <input id="ember347" class="ember-view" type="radio" value="blue">
  <span>Blue</span>
</label>
```

### Non-block form

If you want more control over the DOM, the non-block form only emits a single input element

```javascript
<RadioButton
  @value="green"
  @groupValue={{this.color}}
  @name="colors"
  @changed={{this.colorChanged}}
/>

/* results in */
<input id="ember345" class="ember-view" type="radio" value="green">
```

### Examples in the test application

[More example usage](https://github.com/yapplabs/ember-radio-button/tree/master/tests/dummy/app/components) can be seen in the test application.

## Supported Ember Versions

| ember-radio-button version | supports    |
| -------------------------- | ----------- |
| 3.x                        | Ember 3.16+ |
| 2.x                        | Ember 2.8+  |
| 1.x                        | Ember 1.11+ |

## Properties

_Required:_

| name       | type | description                                                                                                         |
| ---------- | ---- | ------------------------------------------------------------------------------------------------------------------- |
| value      | any  | the unique value represented by the radio button                                                                    |
| groupValue | any  | the value representing a radio group's current value. supply the same `groupValue` to every radio-button in a group |

_Optional:_

| name            | type    | description                                                                                                            |
| --------------- | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| ariaDescribedby | string  | applies an `aria-describedby` attribute to the input element                                                           |
| ariaLabelledby  | string  | applies an `aria-labelledby` attribute to the input element                                                            |
| autofocus       | boolean | applies the `autofocus` property to the input element                                                                  |
| checkedClass    | string  | classname to apply to the `label` element when the input it wraps is checked. block form only. defaults to `"checked"` |
| classNames      | string  | applies additional classnames to the `label` element (block form only)                                                 |
| disabled        | boolean | applies the `disabled` property to the input element                                                                   |
| name            | string  | applies the `name` property to the input element                                                                       |
| radioClass      | string  | applies additional classnames to the input element                                                                     |
| radioId         | string  | sets the `id` of the input element and the `for` property to the label element                                         |
| required        | boolean | applies the `required` property to the input element                                                                   |
| tabindex        | number  | applies a `tabindex` property to the input element                                                                     |

_Actions:_

| name    | description                                                              |
| ------- | ------------------------------------------------------------------------ |
| changed | fires when user interaction causes a radio-button to update `groupValue` |

## Installing

`ember install ember-radio-button`

## Legacy Action Support

A string can be supplied for the `changed` property to enable legacy `sendAction` style action propagation.

## Older versions of ember

ember-radio-button 1.0.0+ requires using htmlbars.
Applications not using htmlbars should use version 0.1.3 or the `pre-htmlbars` branch.

## Collaborating on this repo

- `git clone <repository-url>` this repository
- `cd ember-radio-button`
- `npm install`

## Running

- `ember serve`
- Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

- `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
- `ember test`
- `ember test --server`

## Building

- `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
