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

class EquiContain extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            position: 'static',
        };
        this.autoBind('handleScroll');
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
    componentDidMount() {
        this.staticXY = getOffsetXY(this.equiContain);
        // this.staticLeft = this.equiContain.getBoundingClientRect().left;
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    render() {
        const clsPrefix = 'c-equi-contain';
        const cls = classNames(clsPrefix, {
            [`${clsPrefix}__${this.state.position}`]: true,
        });
        return (
            <div
                className={cls}
                ref={this.storeRef('equiContain')}
            >
                {this.props.children}
            </div>
        );
    }
}

EquiContain.defaultProps = {
    children: null,
};
EquiContain.propTypes = {
    children: PropTypes.node,
};

export default EquiContain;
