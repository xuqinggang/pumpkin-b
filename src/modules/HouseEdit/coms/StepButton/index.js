import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import Button from 'components/Button/index';
import errorNote from 'base/errorNote';
import { expandSingleNum } from 'utils/index';
import { showMessage } from 'modules/Message/actions';
import { nextStep, showValidateError } from '../../actions';
import { switchRoomExpand } from '../../RoomInfo/actions';
import validateData from '../ValidateData/index';
import { fe2beAdapter } from '../../dataAdapter';
import './style.less';

class StepButton extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            dialogHide: true,
        };
        this.isSubmiting = false;
        this.autoBind('handlePrev', 'handleNext');
    }
    handleSubmit(type) {
        if (this.isSubmiting) return;

        const {
            success: submitSuccess = () => {},
            failed: submitFailed = () => {},
        } = this.props.onSubmit;
        const data = this.props.data;

        const submitConfig = {
            NEW: {
                url: '/v1/houses/',
                method: 'post',
            },
            MODIFY: {
                url: `/v1/houses/${data.houseId}`,
                method: 'put',
            },
        };

        this.isSubmiting = true;
        axios[submitConfig[type].method](submitConfig[type].url, fe2beAdapter(data))
        .then((res) => {
            if (res.data.code === 200) {
                submitSuccess({ type, houseId: res.data.data.houseId });
            } else {
                this.props.dispatch(showMessage(res.data.msg));
                submitFailed({ type });
            }
        })
        .catch((e) => {
            const response = e.response;
            let msg = errorNote.OTHER_ERR;
            if (!response) {
                msg = errorNote.NETWORK_ERR;
            } else if (errorNote[response.status]) {
                msg = errorNote[response.status];
            }
            this.props.dispatch(showMessage(msg));
            submitFailed({ type });
        })
        .then(() => {
            this.isSubmiting = false;
        });
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

            this.props.dispatch(nextStep(this.props.pageType));
            this.props.onNext();
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

                    if (error.type === 'roomTag') {
                        this.props.dispatch(showMessage(`请完善卧室${expandSingleNum(i + 1)}房源标签`));
                    }
                    return;
                }
            }
            // 更改redux state
            this.props.dispatch(nextStep(this.props.pageType));
            this.props.onNext();
            break;
        }
        case 'housePics': {
            const error = validateData({ type: pageType }, data.chamberInfo);
            if (error.error) {
                this.props.dispatch(showValidateError({ pageType, error }));
                return;
            }
            this.props.onNext({ houseId: data.houseId, isAllPublished: data.isAllPublished });
            break;
        }
        case 'houseDeploy': {
            const error = validateData({ type: pageType }, data.chamberInfo);
            if (error.error) {
                this.props.dispatch(showValidateError({ pageType, error }));
                return;
            }

            if (data.houseId) {
                // 修改
                this.handleSubmit('MODIFY');
            } else {
                // 新建
                this.handleSubmit('NEW');
            }
            break;
        }
        default:
        }
    }
    render() {
        const clsPrefix = 'c-upload-button';

        const isNew = !this.props.data.houseId;
        const finalBtnText = isNew ? '完成上传' : '完成修改';
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
                    {`${curPage === totalPage ? finalBtnText : '下一步'}`}
                </Button>
            </div>
        );
    }
}

StepButton.propTypes = {
    totalPage: PropTypes.number,
    curPage: PropTypes.number,
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    onSubmit: PropTypes.shape({
        success: PropTypes.func,
        failed: PropTypes.func,
    }),
    pageType: PropTypes.string,
};

StepButton.defaultProps = {
    totalPage: 1,
    curPage: 1,
    onPrev: () => {},
    onNext: () => {},
    onSubmit: {
        success: () => {},
        failed: () => {},
    },
    pageType: '',
};

export default connect(
    (state) => {
        const data = state.houseUpload;
        return {
            data,
        };
    },
)(StepButton);
