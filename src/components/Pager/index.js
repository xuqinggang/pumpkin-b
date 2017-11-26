import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BaseComponent from '../BaseComponent/index';
import './style.less';

const PAGE_PRE_LEVEL = 5;

const PageButton = (props) => {
    const { cur, num } = props;
    const clsPrefix = 'c-pager-button';
    const onClick = () => {
        if (!props.disabled) {
            props.onClick(props);
        }
    };

    if (num < 0) {
        return (
            <a className={classNames(clsPrefix, {
                [`${clsPrefix}__more`]: true,
            })}
            >
                <i className="icon-more" />
            </a>
        );
    }

    const text = props.children ? props.children : num;
    const cls = classNames(clsPrefix, {
        [`${clsPrefix}__cur`]: cur,
        [`${clsPrefix}__disabled`]: props.disabled,
        [props.className]: true,
    });
    return <a className={cls} onClick={onClick} role="button" tabIndex={0}>{text}</a>;
};

PageButton.propTypes = {
    cur: PropTypes.bool,
    num: PropTypes.number,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func,
};

PageButton.defaultProps = {
    cur: false,
    num: 1,
    className: '',
    disabled: false,
    children: null,
    onClick: null,
};

class Pager extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curPage: props.curPage,
        };
        this.autoBind('handleClick', 'handleInputConfirm');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            curPage: nextProps.curPage,
        });
    }

    handlePageChange(num) {
        this.setState({ curPage: num }, () => {
            if (this.props.onChange) {
                this.props.onChange(num);
            }
        });
    }
    handleClick({ num }) {
        this.handlePageChange(num);
    }

    render() {
        const { totalPage } = this.props;
        const { curPage } = this.state;
        const clsPrefix = 'c-pager';
        const buttons = [];
        const half = Math.floor((PAGE_PRE_LEVEL - 1) / 2);
        const leftPartStart = (curPage - half) > 0 ? (curPage - half) : 1;

        if (leftPartStart > 1) {
            buttons.push(1);

            if (leftPartStart > 2) {
                buttons.push(-1);
            }
        }
        for (let i = leftPartStart; i < curPage; i += 1) {
            buttons.push(i);
        }

        const rightPartEnd = curPage + (PAGE_PRE_LEVEL - (curPage - leftPartStart) - 1);
        const lastOne = Math.min(rightPartEnd, totalPage);
        for (let i = curPage; i <= lastOne; i += 1) {
            buttons.push(i);
        }

        if (rightPartEnd < totalPage) {
            if (rightPartEnd < totalPage - 1) {
                buttons.push(-2);
            }

            buttons.push(totalPage);
        }

        return (
            <div className={`${clsPrefix} ${this.props.className}`}>
                {this.props.children}
                <div className={`${clsPrefix}--controls`}>
                    <PageButton
                        key="pager-button-prev"
                        className={`${clsPrefix}-button--prev`}
                        num={curPage - 1}
                        onClick={this.handleClick}
                        disabled={curPage === 1}
                    >
                        <i className="icon-pull-down" />
                    </PageButton>
                    {buttons.map(
                        num => (
                            <PageButton key={`page-button-${num}`} num={num} cur={num === curPage} onClick={this.handleClick} />
                        ),
                    )}
                    <PageButton
                        key="pager-button-next"
                        className={`${clsPrefix}-button--next`}
                        num={curPage + 1}
                        onClick={this.handleClick}
                        disabled={curPage === totalPage}
                    >
                        <i className="icon-pull-down" />
                    </PageButton>
                </div>
            </div>
        );
    }
}

Pager.propTypes = {
    className: PropTypes.string,
    totalPage: PropTypes.number.isRequired,
    curPage: PropTypes.number.isRequired,
    onChange: PropTypes.func,
};

Pager.defaultProps = {
    className: '',
    onChange: null,
};

export default Pager;
