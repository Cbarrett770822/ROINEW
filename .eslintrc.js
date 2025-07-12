module.exports = {
  extends: ['next/core-web-vitals', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    // Allow explicit any in specific cases where it's necessary
    '@typescript-eslint/no-explicit-any': 'warn',
    // Ensure proper return types
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true,
    }],
    // Prevent unused variables
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    // Allow empty functions in specific cases
    '@typescript-eslint/no-empty-function': 'warn',
  },
  // Ignore specific files or directories
  ignorePatterns: [
    '.next/',
    'node_modules/',
    'public/',
    '*.config.js',
    '*.config.mjs',
  ],
};
