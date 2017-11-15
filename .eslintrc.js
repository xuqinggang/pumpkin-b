module.exports = {
    root: true,
    parserOptions: {
        ecmascript: 6,
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true,
        mocha: true,
    },
    extends: 'kuaizhan',
    rules: {
        'react/prefer-stateless-function': 'off',
        'react/jsx-indent-props': [1, 4],
        'react/no-array-index-key': 'off',
        'react/react-in-jsx-scope': 'off',
        'jsx-a11y/label-has-for': 'off',
        'jsx-a11y/href-no-hash': "off",
        'no-underscore-dangle': ['error', { 'allow': ['__INITIAL_STATE__', '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] }]
    },
    settings: {
        'import/resolver': {
            webpack:{
                config: 'build/webpack.client.js',
            },
        },
    },
    globals: {
        React: true,
    },
};
