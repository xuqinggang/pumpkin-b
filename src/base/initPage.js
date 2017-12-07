import React, { Component } from 'react';

const initPage = (PageComponent) => {
    class PageWrap extends Component {
        componentDidMount() {
            window.scroll(0, 0);
        }

        render() {
            return <PageComponent {...this.props} />;
        }
    }

    return PageWrap;
};

export default initPage;
