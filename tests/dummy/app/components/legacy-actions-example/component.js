import Component from '@ember/component';

export default Component.extend({
  color: 'maroon',
  actions: {
    legacyColorChanged(color) {
      window.alert(`Color changed to ${color}`);
    },
  },
});
