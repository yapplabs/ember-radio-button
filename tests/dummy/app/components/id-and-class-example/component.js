import Component from '@ember/component';

export default Component.extend({
  color: 'purple',
  actions: {
    colorChanged(color) {
      window.alert(`Color changed to ${color}`);
    },
  },
});
