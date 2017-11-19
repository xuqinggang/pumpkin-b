import React from 'react';
import MainLayout from 'layouts/MainLayout';
import BaseComponent from 'components/BaseComponent/index';
import HouseModify from 'modules/HouseModify/index';
import HouseManageList from 'modules/HouseManageList/index';
import './style.less';

class HouseManage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            subPageInfo: {
                type: 'LIST',
            },
        };
        this.autoBind('handleEdit', 'handleBack');
    }
    handleEdit({ houseId }) {
        this.setState({
            subPageInfo: {
                type: 'EDIT',
                houseId,
            },
        });
    }
    handleBack() {
        this.setState({
            subPageInfo: {
                type: 'LIST',
            },
        });
    }
    render() {
        const clsPrefix = 'p-house-manage';
        const { subPageInfo } = this.state;
        return (
            <MainLayout>
                {
                    subPageInfo.type === 'EDIT'
                    ? <HouseModify onBack={this.handleBack} houseId={subPageInfo.houseId} />
                    : <HouseManageList onEdit={this.handleEdit} />
                }
            </MainLayout>
        );
    }
}

export default HouseManage;
