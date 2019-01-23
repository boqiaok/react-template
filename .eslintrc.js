module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['babel', 'react', 'import'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    // "prettier/prettier": "error",
    semi: [0],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/prefer-stateless-function': [0],
    'max-len': [2, 150],
    'import/no-extraneous-dependencies': [0],
    'import/extensions': [0],
    'react/jsx-indent': [2, 2],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/href-no-hash': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    "jsx-a11y/anchor-is-valid":[0],
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    "import/no-unresolved": [0],
    "react/prop-types": [0],
    "react/forbid-prop-types": [0],
  },
  globals: {
    document: false,
    window: false,
    require: false,
  },
}
