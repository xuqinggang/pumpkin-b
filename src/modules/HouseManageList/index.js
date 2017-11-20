import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import SubHeader from 'components/SubHeader/index';
import PageHeader from 'components/PageHeader/index';
import HouseStatusManage from 'modules/HouseStatusManage/index';
import HouseManageFilter from 'modules/HouseManageFilter/index';
import './style.less';

class HouseManageList extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleEdit');
    }
    handleEdit({ houseId }) {
        this.props.onEdit({ houseId });
    }
    render() {
        const clsPrefix = 'm-house-manage-list';
        const houseList = [{ houseId: 15 }, { houseId: 16 }, { houseId: 17 }];
        return (
            <div className={clsPrefix}>
                <PageHeader>房态管理</PageHeader>
                <HouseManageFilter />
                {
                    houseList.map((item, index) => (
                        <div key={index}>
                            <SubHeader>双玉树小区</SubHeader>
                            <HouseStatusManage houseId={item.houseId} onEdit={this.handleEdit} />
                        </div>
                    ))
                }
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

export default connect()(HouseManageList);
