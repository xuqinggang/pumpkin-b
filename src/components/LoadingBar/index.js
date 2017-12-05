import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.less';

const cvtPercent = decimal => (`${decimal * 100}%`);

class LoadingBar extends Component {
    render() {
        const clsPrefix = 'c-loading-bar';
        const defaultPercent = 0.1;
        const showPercent = ((1 - defaultPercent) * this.props.percent) + defaultPercent;
        return (
            <div className={`${clsPrefix} ${this.props.className}`}>
                <div
                    style={{ width: cvtPercent(showPercent) }}
                    className={`${clsPrefix}--progress`}
                />
            </div>
        );
    }
}

LoadingBar.propTypes = {
    className: PropTypes.string,
    percent: PropTypes.number,
};

LoadingBar.defaultProps = {
    className: '',
    percent: 0,
};

export default LoadingBar;
