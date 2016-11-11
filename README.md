# ember-radio-button [![Build Status](https://travis-ci.org/yapplabs/ember-radio-button.svg?branch=master)](https://travis-ci.org/yapplabs/ember-radio-button) [![Ember Observer Score](http://emberobserver.com/badges/ember-radio-button.svg)](http://emberobserver.com/addons/ember-radio-button)

**Note**: **ember-radio-button 1.0.0 requires using htmlbars**.  For applications not using htmlbars, use version 0.1.3 or the `pre-htmlbars`
 branch

This ember-cli addon provides a `radio-button` component.

Pass two properties to the component: `value` and `groupValue`.  A `radio-button`
 will be in a checked state when `groupValue === value`.

Clicking on a `radio-button` will set `groupValue` to its `value`.

The component exposes a `changed` action that allows you to do something
when a user interaction causes one of your radio buttons to update `groupValue`.

**Template:**
```javascript
{{radio-button
    value="green"
    groupValue=color
    changed="colorChanged"}}

{{#radio-button
    value="blue"
    groupValue=color
    changed="colorChanged"}}
    Blue
{{/radio-button}}
```

**Results in:**
```html
<input id="ember345" class="ember-view" type="radio" value="green">

<label id="ember346" class="ember-view ember-radio-button">
  <input id="ember347" class="ember-view" type="radio" value="blue">
  Blue
</label>
```

You can additionally provide `disabled` `name` and `required` properties to a `radio-button`

```javascript
{{radio-button
    value="green"
    groupValue=color
    required=true
    disabled=true
    name="color"}}
```

```html
<input id="ember345" class="ember-view" type="radio" value="green" name="color" required disabled>
```

The `radioId` and `radioClass` properties allow specifying the id and adding classnames to the input tag.  When radioId is specified, the label tag's `for` attribute will also use it.

```javascript
{{#radio-button
    radioId="purple-radio"
    radioClass="my-custom-class"
    value="purple"
    groupValue=color
    changed="colorChanged"}}
    Purple
{{/radio-button}}
```

```html
<label id="ember346" for="purple-radio" class="ember-view ember-radio-button">
  <input id="purple-radio" class="ember-view my-custom-class" type="radio" value="purple">
  Purple
</label>
```

For convenience, it's also possible to pass an array of options to the `radio-button-group` component which creates a group of options without having to define the options individually.

```javascript
{{radio-button-group title="Group of Radio Buttons" options=options groupValue=selection changed='changed'}}
```

`options` can be an array of the following format:

```javascript
  options: [
    Ember.Object.create({ name: 'test 1', label: 'test label 1', value: 1 }),
    Ember.Object.create({ name: 'test 2', label: 'test label 2', value: 2 }),
    Ember.Object.create({ name: 'test 3', label: 'test label 3', value: 3 })
  ]
```

```html
<div id="ember883" class="ember-view ember-radio-button-group"><span>Group of Radio Buttons</span>
  <label class="ember-radio-button  ember-view">
    <input id="ember902" name="test 1" type="radio" value="1" class="ember-view">
    test 1 label
  </label>
  <label class="ember-radio-button  ember-view">
    <input id="ember905" name="test 2" type="radio" value="2" class="ember-view">
    test 2 label
  </label>
  <label class="ember-radio-button  ember-view">
    <input id="ember908" name="test 3" type="radio" value="3" class="ember-view">
    test 3 label
  </label>
</div>
```

If `label` is missing from the element, `name` is used in its place to define some text for the button. `name` and `value` are the only required parameters.

## Installing

ember-cli 0.2.3+

`ember install ember-radio-button`

older ember-cli versions

`ember install:npm ember-radio-button`

## Collaborating on this repo

* `git clone` this repository
* `npm install`
* `bower install`

## Running the dummy app

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
