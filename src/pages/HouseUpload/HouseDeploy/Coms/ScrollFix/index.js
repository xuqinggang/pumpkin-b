import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import './style.less';

const getOffsetXY = (el) => {
    let x = 0;
    let y = 0;
    let element = el;
    while (element.offsetParent) {
        x += element.offsetTop;
        y += element.offsetLeft;
        element = element.offsetParent;
    }
    return { x, y };
};

class ScrollFix extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            position: 'static',
        };
        this.autoBind('handleScroll', 'getClientHeight');
    }
    handleScroll() {
        if (this.staticXY.y < window.pageYOffset) {
            this.setState({
                position: 'fixed',
            });
        } else {
            this.setState({
                position: 'static',
            });
        }
    }
    getClientHeight() {
        return this.scrollFix.clientHeight;
    }
    componentDidMount() {
        this.staticXY = getOffsetXY(this.scrollFix);
        // this.staticLeft = this.equiContain.getBoundingClientRect().left;
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    render() {
        const clsPrefix = 'c-scroll-fix';
        const cls = classNames(clsPrefix, {
            [this.props.className]: true,
            [`${clsPrefix}__${this.state.position}`]: true,
        });
        return (
            <div
                className={cls}
                ref={this.storeRef('scrollFix')}
            >
                {this.props.children}
            </div>
        );
    }
}

ScrollFix.defaultProps = {
    className: '',
    children: null,
};
ScrollFix.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
};

export default ScrollFix;
