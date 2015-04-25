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
