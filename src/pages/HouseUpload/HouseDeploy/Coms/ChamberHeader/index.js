import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import './style.less';

class ChamberHeader extends BaseComponent {
    render() {
        const clsPrefix = 'c-chamber-header';
        return (
            <div className={clsPrefix}>
                <i className={`${clsPrefix}--icon`} />
                <div className={`${clsPrefix}--text`}>{this.props.children}</div>
            </div>
        );
    }
}

ChamberHeader.defaultProps = {
    children: null,
};

ChamberHeader.propTypes = {
    children: PropTypes.node,
};

export default ChamberHeader;
