import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import './style.less';

class EmptyHouseList extends BaseComponent {
    render() {
        return !this.props.hide ?
            (
                <div className="m-empty-house-list">
                    <div>暂无符合筛选条件的房源</div>
                </div>
            )
            : null;
    }
}

EmptyHouseList.propTypes = {
    hide: PropTypes.bool,
};

EmptyHouseList.defaultProps = {
    hide: true,
};

export default connect(
    (state) => {
        let hide = true;
        const filter = state.houseManage.filter;
        const houseList = state.houseManage.houseList;
        const isLoading = state.houseManage.fetchLoading;
        if (!(filter.rentalType === 'ALL' &&
            filter.village === 'ALL' &&
            filter.roomStatus === 'ALL') &&
            !isLoading &&
            houseList.length === 0) {
            hide = false;
        }
        return {
            hide,
        };
    },
)(EmptyHouseList);
