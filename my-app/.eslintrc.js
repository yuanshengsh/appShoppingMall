
const resolve = require('resolve');
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb", 
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        'react/jsx-filename-extension': [2, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
        // @off 没必要限制
        'react/self-closing-comp': 'off',
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": ["error"],
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "import/prefer-default-export":"off",
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "pathGroupsExcludedImportTypes":"off"
    },
    "overrides": [
        {
          "files": ["**/*.ts", "**/*.tsx"],
          "plugins": ["@typescript-eslint"],
          "rules": {
            "no-use-before-define": "off",
            "@typescript-eslint/no-use-before-define": ["error"],
          },
        }
      ],
    settings: {
        'import/resolver': {
            // ...
            // 配置 eslint-import-resolver-typescript 读取 tsconfig.json 的路径
            // typescript: {
            //     directory: [resolve(__dirname, './src/tsconfig.json'), resolve(__dirname, './scripts/tsconfig.json')],
            // },
        },
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
                json: 'never',
                js: 'never'
            },
        ],
    }
};
