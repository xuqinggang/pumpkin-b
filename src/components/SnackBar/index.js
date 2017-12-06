import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import './style.less';

class SnackBar extends BaseComponent {
    constructor(props) {
        super(props);
        this.delay = 3000;
        this.autoBind('tryDestory');
    }
    tryDestory() {
        if (this.props.hide) return;
        setTimeout(() => {
            this.props.onTimeout();
        }, this.delay);
    }
    componentDidUpdate() {
        this.tryDestory();
    }
    componentDidMount() {
        this.tryDestory();
    }
    render() {
        const clsPrefix = 'c-snack-bar';
        const cls = classNames(`${clsPrefix}--content`, {
            [this.props.className]: true,
            [`${clsPrefix}--content__hide`]: this.props.hide,
        });
        return (
            <div className={clsPrefix}>
                <div className={cls}>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

SnackBar.propTypes = {
    hide: PropTypes.bool,
    onTimeout: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
};

SnackBar.defaultProps = {
    hide: true,
    onTimeout: () => {},
    className: '',
    children: null,
};

export default SnackBar;
