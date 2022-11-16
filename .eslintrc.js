module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "prettier",
  ],
  rules: {
    "linebreak-style": 0,
    "import/prefer-default-export": 0,
    "prettier/prettier": 0,
    "import/extensions": 0,
    "no-use-before-define": 0,
    "import/no-unresolved": 0,
    "import/no-extraneous-dependencies": 0, // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용
    "no-shadow": 0,
    "react/prop-types": 0,
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "jsx-a11y/no-noninteractive-element-interactions": 0,
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  "lint-staged": {
    "*": ["prettier --write"],
    "*.js|*.jsx|*.ts|*.tsx": ["eslint --fix"],
  },
  husky: {
    hooks: {
      "pre-commit": "lint-staged",
    },
  },
  compilerOptions: {
    noEmit: true,
  },
};
