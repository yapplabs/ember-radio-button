# ember-radio-button [![Build Status](https://travis-ci.org/yapplabs/ember-radio-button.svg?branch=master)](https://travis-ci.org/yapplabs/ember-radio-button) [![Ember Observer Score](https://emberobserver.com/badges/ember-radio-button.svg)](https://emberobserver.com/addons/ember-radio-button)

This addon provides a `radio-button` component.

A `radio-button` will be in a checked state when the `value` property matches the `groupValue` property.
`value` should be unique per radio-button, while the same `groupValue` should be provided to each
`radio-button` in the group.

Clicking on a `radio-button` will set `groupValue` to its `value`.

## Usage

### Block Form

The block form emits a label wrapping the input element and any elements passed to the block.

**Template:**
```javascript
{{#radio-button
    value="blue"
    groupValue=color
    changed="colorChanged"
}}
    <span>Blue</span>
{{/radio-button}}

/* results in */
<label id="ember346" class="ember-view ember-radio-button">
  <input id="ember347" class="ember-view" type="radio" value="blue">
  <span>Blue</span>
</label>
```

### Non-block form

If you want more control over the DOM, the non-block form only emits a single input element

```javascript
{{radio-button
    value="green"
    groupValue=color
    name="colors"
    changed="colorChanged"}}

/* results in */
<input id="ember345" class="ember-view" type="radio" value="green">
```

### Examples in the test application

[More example usage](https://github.com/yapplabs/ember-radio-button/tree/master/tests/dummy/app/components) can be seen in the test application.


## Properties

*Required:*

| name       | type      | description            |
|------------|-----------|------------------------|
| value      | any       |the unique value represented by the radio button |
| groupValue | any       |the value representing a radio group's current value. supply the same `groupValue` to every radio-button in a group |


*Optional:*

| name       | type      | description            |
|------------|-----------|------------------------|
| autofocus  | boolean   | applies the `autofocus` property to the input element |
| classNames | string    | applies additional classnames to the `label` element (block form only) |
| disabled   | boolean   | applies the `disabled` property to the input element  |
| name       | string    | applies the `name` property to the input element      |
| radioClass | string    | applies additional classnames to the input element    |
| radioId    | string    | sets the `id` of the input element and the `for` property to the label element |
| required   | boolean   | applies the `required` property to the input element  |
| tabindex   | number    | applies a `tabindex` property to the input element    |

*Actions:*

| name       | description            |
|------------|------------------------|
| changed    | fires when user interaction causes a radio-button to update `groupValue`|


## Installing

`ember install ember-radio-button`

## Older versions of ember

ember-radio-button 1.0.0+ requires using htmlbars.
Applications not using htmlbars should use version 0.1.3 or the `pre-htmlbars` branch.

## Collaborating on this repo

* `git clone <repository-url>` this repository
* `cd ember-radio-button`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
