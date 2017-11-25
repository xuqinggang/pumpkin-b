import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import SubHeader from 'components/SubHeader/index';
import PageHeader from 'components/PageHeader/index';
import ConfirmDialog from 'components/ConfirmDialog/index';
import HouseStatusManage from 'modules/HouseStatusManage/index';
import HouseManageFilter from 'modules/HouseManageFilter/index';
import RoomStatusDialog from 'modules/RoomStatusDialog/index';
import HouseManageListPager from 'modules/HouseManageListPager/index';
import { timeSignBy, timeFormat } from 'utils/index';
import { hideStatusChangeDialog, deleteHouse } from './actions';
import './style.less';

class HouseManageList extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            deleteHouseId: -1,
            deleteDialogHide: true,
        };
        this.autoBind(
            'handleEdit',
            'handleDialogConfirm',
            'handleDialogCancel',
            'handleDelete',
            'handleDeleteDialogConfirm',
            'handleDeleteDialogCancel',
        );
    }
    handleEdit({ houseId }) {
        this.props.onEdit({ houseId });
    }
    handleDelete({ houseId }) {
        this.setState({
            deleteDialogHide: false,
        });
        this.handleDeleteDialogConfirm = () => {
            axios.delete(`/v1/houses/${houseId}`)
            .then((res) => {
                if (res.data.code === 200) {
                    this.setState({
                        deleteDialogHide: true,
                        deleteHouseId: houseId,
                    }, () => {
                        // 延迟执行，等待动画完成
                        setTimeout(() => {
                            this.props.dispatch(deleteHouse(houseId));
                        }, 500);
                    });
                }
            });
        };
    }
    handleDeleteDialogCancel() {
        this.setState({
            deleteDialogHide: true,
        });
    }
    handleDialogConfirm({ type, value }) {
        this.props.dialogOnConfirm({ type, value });
        this.props.dispatch(hideStatusChangeDialog());
    }
    handleDialogCancel() {
        this.props.dispatch(hideStatusChangeDialog());
    }
    render() {
        const clsPrefix = 'm-house-manage-list';
        let lastBlockTitleValue = null;
        return (
            <div className={clsPrefix}>
                <PageHeader>房态管理</PageHeader>
                <HouseManageFilter />
                {
                    this.props.houseList.map((item) => {
                        let blockTitleValue = null;
                        let blockTitleText = '';

                        // 合并列表
                        if (this.props.isSortByTime) {
                            blockTitleValue = timeSignBy('date', item.createTime * 1000);
                            blockTitleText = timeFormat(item.createTime * 1000);
                        } else {
                            blockTitleValue = item.block.id;
                            blockTitleText = item.block.name;
                        }
                        // 判断是否合并
                        const hideTitle = lastBlockTitleValue &&
                            blockTitleValue === lastBlockTitleValue;

                        lastBlockTitleValue = blockTitleValue;
                        return (
                            <div key={item.id}>
                                {
                                    hideTitle
                                    ? null
                                    : <SubHeader>{blockTitleText}</SubHeader>
                                }
                                <div
                                    className={classNames(`${clsPrefix}--house`, {
                                        [`${clsPrefix}--house__deleted`]: this.state.deleteHouseId === item.id,
                                    })}
                                >
                                    <HouseStatusManage
                                        house={item}
                                        onEdit={this.handleEdit}
                                        onDelete={this.handleDelete}
                                    />
                                </div>
                            </div>
                        );
                    })
                }
                <HouseManageListPager />
                <RoomStatusDialog
                    type={this.props.dialogType}
                    hide={this.props.dialogHide}
                    onCancel={this.handleDialogCancel}
                    onConfirm={this.handleDialogConfirm}
                />
                <ConfirmDialog
                    hide={this.state.deleteDialogHide}
                    onConfirm={this.handleDeleteDialogConfirm}
                    onCancel={this.handleDeleteDialogCancel}
                >确定删除该房源吗？</ConfirmDialog>
            </div>
        );
    }
}

HouseManageList.propTypes = {
    onEdit: PropTypes.func,
};

HouseManageList.defaultProps = {
    onEdit: () => {},
};

export default connect(
    (state) => {
        const {
            type,
            hide,
            onConfirm,
        } = state.houseManage.roomStatusDialog;

        const houseList = state.houseManage.houseList;
        const isSortByTime = state.houseManage.filter.isSortByTime;
        return {
            dialogType: type,
            dialogHide: hide,
            dialogOnConfirm: onConfirm,
            houseList,
            isSortByTime,
        };
    },
)(HouseManageList);
