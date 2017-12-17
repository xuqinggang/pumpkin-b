import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import BaseComponent from 'components/BaseComponent/index';
import SubHeader from 'components/SubHeader/index';
import PageHeader from 'components/PageHeader/index';
import ConfirmDialog from 'components/ConfirmDialog/index';
import HouseStatusManage from 'modules/HouseStatusManage/index';
import HouseManageFilter from 'modules/HouseManageFilter/index';
import ShareLinkDialog from 'modules/ShareLinkDialog/index';
import RoomStatusDialog from 'modules/RoomStatusDialog/index';
import HouseManageListPager from 'modules/HouseManageListPager/index';
import NoneHouseNote from 'modules/NoneHouseNote/index';
import EmptyHouseList from 'modules/EmptyHouseList/index';
import LoadingHouseNote from 'modules/LoadingHouseNote/index';
import { timeSignBy, timeFormat } from 'utils/index';
import { hideStatusChangeDialog, deleteHouse, fetchHouseManageList } from './actions';
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
        this.props.history.push({
            pathname: '/house-modify',
            search: `?houseId=${houseId}`,
        });
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
                            // 删除最后一个的时候需要请求数据并刷新列表
                            if (this.props.houseList.length === 1
                                && this.props.houseList.map(
                                    item => (item.id)).indexOf(houseId) !== -1) {
                                this.props.dispatch(fetchHouseManageList({
                                    ...this.props.filter,
                                    curPage: this.props.filter.curPage > 1
                                        ? (this.props.filter.curPage - 1)
                                        : 1,
                                }));
                            } else {
                                this.props.dispatch(deleteHouse(houseId));
                            }
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
    componentDidMount() {
        // 页面数据初始化
        this.props.dispatch(fetchHouseManageList({
            ...this.props.filter,
            village: 'ALL',
            rentalType: 'ALL',
            roomStatus: 'ALL',
            isSortByTime: true,
            curPage: 1,
            totalPage: 1,
        }));
    }
    render() {
        const clsPrefix = 'm-house-manage-list';
        let lastBlockTitleValue = null;
        return (
            <div className={clsPrefix}>
                <PageHeader>房源管理</PageHeader>
                <HouseManageFilter />
                {
                    this.props.houseList.map((item) => {
                        let blockTitleValue = null;
                        let blockTitleText = '';

                        // 合并列表
                        if (this.props.isSortByTime) {
                            blockTitleValue = timeSignBy('date', item.updateTime * 1000);
                            blockTitleText = timeFormat(item.updateTime * 1000);
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
                <LoadingHouseNote />
                <EmptyHouseList />
                <NoneHouseNote />
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
                <ShareLinkDialog />
            </div>
        );
    }
}

export default connect(
    (state) => {
        const {
            type,
            hide,
            onConfirm,
        } = state.houseManage.roomStatusDialog;

        const houseList = state.houseManage.houseList;
        const isSortByTime = state.houseManage.filter.isSortByTime;
        const filter = state.houseManage.filter;
        return {
            dialogType: type,
            dialogHide: hide,
            dialogOnConfirm: onConfirm,
            houseList,
            isSortByTime,
            filter,
        };
    },
)(withRouter(HouseManageList));
