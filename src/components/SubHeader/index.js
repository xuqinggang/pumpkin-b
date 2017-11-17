import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import './style.less';

class SubHeader extends BaseComponent {
    render() {
        const clsPrefix = 'c-sub-header';
        return (
            <div className={clsPrefix}>
                <i className={`${clsPrefix}--icon`} />
                <div className={`${clsPrefix}--text`}>{this.props.children}</div>
            </div>
        );
    }
}

SubHeader.defaultProps = {
    children: null,
};

SubHeader.propTypes = {
    children: PropTypes.node,
};

export default SubHeader;
