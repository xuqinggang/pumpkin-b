import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import Button from 'components/Button/index';
import ConfirmDialog from 'components/ConfirmDialog/index';
import { nextStep, showValidateError } from '../../actions';
import { switchRoomExpand } from '../../RoomInfo/actions';
import validateData from '../ValidateData/index';
import { fe2beAdapter } from '../../dataAdapter';
import './style.less';

class UploadButton extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            dialogHide: true,
        };
        this.autoBind('handlePrev', 'handleNext', 'handleDialogConfirm', 'handleDialogCancel');
    }
    handleDialogConfirm() {
        this.setState({
            dialogHide: true,
        }, () => {
            this.props.dispatch(nextStep(this.props.pageType));
            this.props.onNext();
        });
    }
    handleDialogCancel() {
        this.setState({
            dialogHide: true,
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
            // 更改redux state
            const curHouseType = data[pageType].houseType;
            const curRentalType = data[pageType].rentalType;

            const lastHouseType = data.commonInfo.houseType;
            const lastRentalType = data.commonInfo.rentalType;

            if (lastRentalType !== null &&
                (curRentalType !== lastRentalType ||
                    curHouseType.room !== lastHouseType.room ||
                    curHouseType.saloon !== lastHouseType.saloon ||
                    curHouseType.toilet !== lastHouseType.toilet)) {
                this.setState({
                    dialogHide: false,
                });
            } else {
                this.props.dispatch(nextStep(this.props.pageType));
                this.props.onNext();
            }
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
            this.props.onNext();
            break;
        }
        case 'housePics': {
            const error = validateData({ type: pageType }, data.chamberInfo);
            if (error.error) {
                this.props.dispatch(showValidateError({ pageType, error }));
                return;
            }
            this.props.onNext();
            break;
        }
        case 'houseDeploy': {
            // TODO
            const error = validateData({ type: pageType }, data.chamberInfo);
            if (error.error) {
                this.props.dispatch(showValidateError({ pageType, error }));
                return;
            }
            axios.post('/v1/houses/', fe2beAdapter(data));
            break;
        }
        default:
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
                    {`${curPage === totalPage ? '完成上传' : '下一步'}`}
                </Button>
                <ConfirmDialog
                    hide={this.state.dialogHide}
                    onConfirm={this.handleDialogConfirm}
                    onCancel={this.handleDialogCancel}
                >
                    <div>确定修改房源户型吗</div>
                    <div>信息将清空重新编辑</div>
                </ConfirmDialog>
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
