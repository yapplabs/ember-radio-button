import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  color: 'green',
  actions: {
    colorChanged(color) {
      window.alert(`Color changed to ${color}`);
    }
  }
});
