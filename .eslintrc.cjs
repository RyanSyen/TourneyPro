module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    // 'eslint:recommended',
    'airbnb', // airbnb has everything eslint:recommended has so we will just remove eslint:recommended
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', //* must be last
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'wdyr.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json', // tell eslint where to find our ts config
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh', 'prettier', 'simple-import-sort'],
  overrides: [
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['./**/*.js', './**/*.d.ts'],
    },
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': ['error', 'ignorePackages'], // to optimize vite's operation of resolving import
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.tsx', '.ts'] },
    ],
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: false,
        allowNamespace: false,
        allowLeadingUnderscore: false,
      },
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-closing-bracket-location': [
      'error',
      {
        nonEmpty: 'tag-aligned',
        selfClosing: 'tag-aligned',
      },
    ],
    'react/jsx-closing-tag-location': ['error'],
    'no-multi-spaces': 'error',
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'allow',
      },
    ],
    'react/jsx-curly-spacing': ['error', 'never'], // Enforce no spaces inside curly braces
    'react/jsx-boolean-value': 'error',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/no-access-key': 'error',
    'react/no-array-index-key': 'error',
    'react/jsx-wrap-multilines': 'error',
    'react/self-closing-comp': 'error',
    // "react/jsx-no-bind": "error", // enable when performance becomes an issue
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'react/function-component-definition': [
      2,
      { namedComponents: ['arrow-function'] },
    ],
    'no-restricted-imports': ['error', { patterns: ['@/features/*/*'] }],
  },
};
