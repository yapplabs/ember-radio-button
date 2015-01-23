# ember-radio-button

ember-cli addon for an Ember `radio-button` component.

It allows a group of radio buttons with different `value` properties
to be compared to a single property called `groupValue`.

Clicking on the component will set `groupValue` to `value`. The radio
button will be in a checked state when `groupValue === value`.

The component exposes a `changed` action that allows you to do something
when a user interaction causes one of your radio buttons to update `groupValue`.
This is useful if you want to autosave a model in response to a user action,
rather than with an observer.

To install this addon in your ember-cli project, use `npm install ember-radio-button --save-dev`.
Run the dummy app for examples and documentation.

Handlebars:
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

Results in:
```html
<input id="ember345" class="ember-view" type="radio" value="green">

<label id="ember346" class="ember-view">
  <input id="ember347" class="ember-view" type="radio" value="blue">
  Blue
</label>
```

This README outlines the details of collaborating on this Ember addon.

## Installing

`npm install ember-radio-button --save-dev`

## Collaborating on this repo

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
