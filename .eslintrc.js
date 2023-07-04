module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // JSDOC Require
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: false,
          ArrowFunctionExpression: true,
        },
      },
    ],
    'no-plusplus': 0,
    // 함수내에서 매개변수의 값을 직접 변경하도록 허용 (express의 req 파라미터에서만 재할당하는 것을 권장)
    'no-param-reassign': 0,
    // 일부 변수에 대해 언더스코어로 시작 허용
    'no-underscore-dangle': [
      2,
      {
        allowAfterThis: true,
        allow: ['_id', '__v'],
      },
    ],
    'newline-per-chained-call': 0,
    // integration, spec 파일에서 devDependencies 참조 허용
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['!**.*.(integration|spec).js'],
      },
    ],
    // 동적 참조에 대해 경고만 띄우도록 변경
    'import/no-dynamic-require': 1,
    'max-len': [
      'error',
      {
        ignoreComments: true,
        code: 100,
      },
    ],
    'operator-assignment': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
