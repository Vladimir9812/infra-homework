import strictConstRule from './rules/strict-const.js';

const plugin = {
  meta: {
    name: 'eslint-plugin-infra',
    version: '0.0.1',
  },
  rules: {
    'strict-const': strictConstRule
  }
};

// ESM
export default plugin;
