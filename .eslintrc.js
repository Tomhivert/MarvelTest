module.exports = {
  env: {
    node: true,
    es2022: true,
    jest: true,
  },
  extends: ['airbnb-base', 'plugin:node/recommended', 'plugin:jest/recommended', 'prettier'],
  plugins: ['import', 'node', 'jest', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script', // Using CommonJS modules
  },
  rules: {
    // Prettier integration
    'prettier/prettier': 'error',

    // Console usage - allow for server logging
    'no-console': 'off',

    // Import/Export rules
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.js', '**/*.spec.js', '**/jest.config.js', '**/tests/**/*'],
      },
    ],

    // Node.js specific rules
    'node/no-unpublished-require': [
      'error',
      {
        allowModules: ['supertest'],
      },
    ],
    'node/no-missing-require': 'error',
    'node/no-extraneous-require': 'error',
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        version: '>=14.0.0',
        ignores: ['restSpreadProperties'],
      },
    ],
    'node/no-unsupported-features/es-builtins': [
      'error',
      {
        version: '>=14.0.0',
      },
    ],

    // Security rules (basic ones without plugin)
    'no-eval': 'error',
    'no-implied-eval': 'error',

    // Code quality rules
    'prefer-const': 'error',
    'no-var': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-use-before-define': ['error', { functions: false }],
    'consistent-return': 'error',
    'prefer-destructuring': 'warn',
    'prefer-template': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-spacing': 'error',
    'object-shorthand': 'error',

    // Error handling
    'no-throw-literal': 'error',
    'prefer-promise-reject-errors': 'error',

    // Jest specific rules
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',

    // CommonJS specific
    'import/no-dynamic-require': 'warn',
    'global-require': 'warn',

    // Relaxed rules for this project
    'import/newline-after-import': 'warn',
    'padded-blocks': 'off',
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js', 'tests/**/*'],
      env: {
        jest: true,
      },
      rules: {
        // Relaxed rules for tests
        'no-unused-expressions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'node/no-unpublished-require': 'off',
      },
    },
  ],
};
