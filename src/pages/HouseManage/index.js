import React from 'react';
import { connect } from 'react-redux';
import BaseComponent from 'components/BaseComponent/index';
import './style.less';

class HouseManage extends BaseComponent {
    render() {
        const clsPrefix = 'p-house-manage';
        return (
            <div className={clsPrefix} />
        );
    }
}

export default connect()(HouseManage);
