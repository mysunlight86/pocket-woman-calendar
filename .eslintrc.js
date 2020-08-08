module.exports = {
    "env": {
        "es6": true,
        "browser": true
    },
    "extends": [
        "airbnb",
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-uses-vars": 1,
        "react/jsx-filename-extension": [1, {"extensions": ["js", "jsx"]}],
        "arrow-parens": ["error", "as-needed"],
        "no-param-reassign": ["error", { "props": false }],
        "comma-dangle": ["error", "only-multiline"],
        "react/display-name": 0,
        "linebreak-style": 0,
        "react/jsx-props-no-spreading": [2, {
            "html": "enforce",
            "custom": "ignore",
            "explicitSpread": "ignore"
        }],
        "no-plusplus": 0,
        "max-len": ["error", { "code": 120 }]
    },
};