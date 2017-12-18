import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import PageTitle from 'modules/PageTitle/index';

class EmptyLayout extends BaseComponent {
    render() {
        return (
            <div>
                <PageTitle title={this.props.title} />
                {this.props.children}
            </div>
        );
    }
}

EmptyLayout.defaultProps = {
    children: null,
    title: '',
};

EmptyLayout.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
};

export default EmptyLayout;
