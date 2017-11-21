import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import Button from 'components/Button/index';
import PropTypes from 'prop-types';
import { nextStep, showValidateError } from '../../actions';
import { switchRoomExpand } from '../../RoomInfo/actions';
import validateData from '../ValidateData/index';
import { fe2beAdapter } from '../../dataAdapter';
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
        const pageType = this.props.pageType;
        const data = this.props.data;

        switch (pageType) {
        case 'baseInfo': {
            // 校验
            const error = validateData({ type: pageType }, data[pageType]);
            if (error.error) {
                this.props.dispatch(showValidateError({ pageType, error }));
                return;
            }
            // 更改redux state
            this.props.dispatch(nextStep(this.props.pageType));
            // 下一步
            break;
        }
        case 'roomInfo': {
            const roomInfo = data[pageType];
            for (let i = 0; i < roomInfo.length; i += 1) {
                // 校验
                const curRoomInfo = data[pageType][i];
                const error = validateData({ type: pageType }, curRoomInfo);
                if (error.error) {
                    this.props.dispatch(showValidateError({
                        pageType,
                        error: {
                            ...error,
                            roomId: curRoomInfo.roomId,
                        },
                    }));
                    this.props.dispatch(switchRoomExpand(curRoomInfo.roomId));
                    return;
                }
            }
            // 更改redux state
            this.props.dispatch(nextStep(this.props.pageType));
            break;
        }
        case 'housePics': {
            const error = validateData({ type: pageType }, data.chamberInfo);
            if (error.error) {
                this.props.dispatch(showValidateError({ pageType, error }));
                return;
            }
            break;
        }
        case 'houseDeploy': {
            // TODO
            const error = validateData({ type: pageType }, data.chamberInfo);
            if (error.error) {
                this.props.dispatch(showValidateError({ pageType, error }));
                return;
            }
            console.log(fe2beAdapter(data));
            break;
        }
        default:
        }
        this.props.onNext();
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
                    {`${curPage === totalPage ? '完成上传' : '下一步'}`}
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
    pageType: PropTypes.string,
};

UploadButton.defaultProps = {
    totalPage: 1,
    curPage: 1,
    onPrev: () => {},
    onNext: () => {},
    pageType: '',
};

export default connect(
    (state) => {
        const data = state.houseUpload;
        return {
            data,
        };
    },
)(UploadButton);
