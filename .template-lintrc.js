'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'no-positive-tabindex': 'off',
  },
  overrides: [
    {
      files: ['tests/dummy/app/**/*.hbs'],
      rules: {
        'no-inline-styles': 'off',
        'require-input-label': 'off',
      },
    },
  ],
};
