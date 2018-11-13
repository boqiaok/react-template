module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: ['babel', 'react', 'import'],
  rules: {
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
  },
  globals: {
    document: false,
    window: false,
    require: false,
  },
}
