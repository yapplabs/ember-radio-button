
## v3.0.0-beta.1 (2022-12-06)

## v3.0.0-beta.0 (2022-05-31)

#### :boom: Breaking Change
* [#119](https://github.com/yapplabs/ember-radio-button/pull/119) [BREAKING] Update dependencies, including ember-auto-import and add CI ([@lukemelia](https://github.com/lukemelia))

#### Committers: 4
- Gabriel Cousin ([@GabrielCousin](https://github.com/GabrielCousin))
- Luke Melia ([@lukemelia](https://github.com/lukemelia))
- Ray Cohen ([@raycohen](https://github.com/raycohen))
- Will Bagby ([@bagby](https://github.com/bagby))

### 2.0.1
 - fix to use valid `aria-checked` attribute values

### 2.0.0
 - fixes `sendAction` deprecation warnings, using closure actions internally
 - removes support for Ember versions below 2.8
 - removes `labeled-radio-button` which was replaced by the block usage of `radio-button`

### 1.3.0
 - adds support for passing a closure action to the `changed` property

### 1.2.4
 - adds `aria-checked` attribute binding

### 1.2.3
 - adds `checkedClass` to override the default "checked" classname on the label when it is checked

### 1.2.2
 - adds `ariaDescribedby`

### 1.2.1
 - adds `ariaLabelledby`

### 1.2.0
 - README overhaul
 - adds `tabindex` and `autofocus`
 - use `Ember.isEqual` for comparison
 - updated examples in the test application to be implemented with components
 - fix for ember engine support

### 1.1.1
 - adds support for engines
 - Potential Breaking Change: The addon now uses templates from the addon folder.
   If you were supplying your own templates at the previous location
   (`app/templates/components/radio-button.hbs` for example)
   You will need to instead extend the provided component and explicitly
   supply your own template.

### 1.0.7

 - adds a `radioClass` property to put any classes you want on the input element
 - adds a `radioId` property to specify an id for the input element, allows
   associating non-wrapping label elements

### 1.0.6

 - Use `hasBlock` internally and remove deprecation warnings from
   accessing the component's `template` property

### 1.0.5

 - Improve IE8 Support

### 1.0.4

 - Fix putting additional classNames on the label

### 1.0.3

 - Put additional classNames on the label

### 1.0.2

 - Add `ember-radio-button` class to the label when used as a block

### 1.0.1

 - Put a `checked` classname on the label element when a block form
   radio-button is checked

### 1.0.0

 - Update to htmlbars
 - Rely on the `change` event, not `click`
 - Only `label` and `input` elements emitted, no more `span`

### 0.1.3

 - Add `required` and `name` bound attributes

### 0.1.2

 - Add `disabled` bound attribute
