import React from 'react';
import { withRouter } from 'react-router-dom';
import MainLayout from 'layouts/MainLayout';
import BaseComponent from 'components/BaseComponent/index';
import HouseModify from 'modules/HouseModify/index';
import './style.less';

class HouseManage extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleBack');
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
        this.props.history.push({
            pathname: '/house-manage',
        });
    }
    render() {
        return (
            <MainLayout>
                <div className="p-house-modify">
                    <HouseModify />
                </div>
            </MainLayout>
        );
    }
}

export default withRouter(HouseManage);
