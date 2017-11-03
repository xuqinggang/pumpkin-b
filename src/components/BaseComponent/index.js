import React, { Component } from 'react';

class BaseComponent extends Component {
    /**
     * bind event handler for performance reason
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
     */
    autoBind(...args) {
        for (let i = 0; i < args.length; i += 1) {
            const func = this[args[i]];
            if (func) {
                this[args[i]] = func.bind(this);
            }
        }
    }

    /**
     * store an DOM element in refs
     * @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
     */
    storeRef(name) {
        return (c) => {
            this[name] = c;
        };
    }

    render() {
        return <div />;
    }
}

export default BaseComponent;
