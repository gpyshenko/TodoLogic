module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'template-curly-spacing': 'off',
    "indent": "off",
    'space-before-function-paren': 'off',
    'semi': ["off", "always"],
    'object-curly-spacing': 'off',
    'no-trailing-spaces': 'off',
    'no-unused-vars': 'off',
    'no-tabs': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-return-assign': 'off',
    'no-useless-escape': 'off',
    'brace-style': 'off',
    'block-spacing': 'off',
    'arrow-parens': ["warn", "always"],
    'camelcase': 'off',
    'no-undef': 'off',
    'prefer-promise-reject-errors': 'off',
    'keyword-spacing': 'off',
    'comma-spacing': 'off',
    'one-var': 'off',
    'quotes': 'off',
    'eol-last': 'off',
    'dot-notation': 'off',
    'quote-props': 'off',
    'handle-callback-err': 'off',
    'no-unreachable': 'warn',
    'no-prototype-builtins': 'warn',

    'vue/no-unused-components': ["warn"],
    'vue/no-use-v-if-with-v-for': 'off',
    "vue/html-quotes": ["error", "double"]
  }
}
