import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Button from 'components/Button/index';
import PropTypes from 'prop-types';
import { nextStep } from '../../actions';
import './style.less';

class UploadButton extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handlePrev', 'handleNext');
    }
    handlePrev() {
        this.props.onPrev();
    }
    handleNext() {
        if (this.props.curPage === this.props.totalPage) {
            // 校验
            // 提交
        } else {
            // 校验

            // 更改redux state
            this.props.dispatch(nextStep(this.props.curPage));
            // 下一步
            this.props.onNext();
        }
    }
    render() {
        const clsPrefix = 'c-upload-button';
        const {
            totalPage,
            curPage,
        } = this.props;
        return (
            <div className={clsPrefix}>
                {
                    curPage > 1 ?
                        <Button
                            size="large"
                            className={`${clsPrefix}--button`}
                            onClick={this.handlePrev}
                        >
                            上一步
                        </Button>
                        : null
                }
                <Button
                    size="large"
                    className={`${clsPrefix}--button ${clsPrefix}--button-last`}
                    onClick={this.handleNext}
                    type="confirm"
                >
                    {`${curPage === totalPage ? '提交' : '下一步'}`}
                </Button>
            </div>
        );
    }
}

UploadButton.propTypes = {
    totalPage: PropTypes.number,
    curPage: PropTypes.number,
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
};

UploadButton.defaultProps = {
    totalPage: 1,
    curPage: 1,
    onPrev: () => {},
    onNext: () => {},
};

export default connect()(UploadButton);
