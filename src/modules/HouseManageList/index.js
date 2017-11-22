import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import SubHeader from 'components/SubHeader/index';
import PageHeader from 'components/PageHeader/index';
import HouseStatusManage from 'modules/HouseStatusManage/index';
import HouseManageFilter from 'modules/HouseManageFilter/index';
import RoomStatusDialog from 'modules/RoomStatusDialog/index';
import HouseManageListPager from 'modules/HouseManageListPager/index';
import { timeSignBy, timeFormat } from 'utils/index';
import { hideStatusChangeDialog } from './actions';
import './style.less';

class HouseManageList extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleEdit', 'handleDialogConfirm', 'handleDialogCancel');
    }
    handleEdit({ houseId }) {
        this.props.onEdit({ houseId });
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
                            blockTitleValue = timeSignBy('day', item.createTime * 1000);
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
                                <HouseStatusManage
                                    house={item}
                                    onEdit={this.handleEdit}
                                />
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
