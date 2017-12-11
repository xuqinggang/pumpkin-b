import React from 'react';
import { withRouter } from 'react-router-dom';
import BaseComponent from 'components/BaseComponent/index';
import PageHeader from 'components/PageHeader/index';
import './style.less';

class HouseModifyHeader extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleBack');
    }
    handleBack() {
        this.props.history.push({
            pathname: '/house-manage',
        });
    }
    render() {
        const clsPrefix = 'm-house-modify';
        return (
            <div className={clsPrefix}>
                <div className={`${clsPrefix}--nav`}>
                    <button
                        className={`${clsPrefix}--back`}
                        onClick={this.handleBack}
                    >房源管理</button>
                    <span className={`${clsPrefix}--gap`}> / </span>
                    <span className={`${clsPrefix}--title`}>房源编辑 (房源ID: {this.props.houseId})</span>
                </div>
                <PageHeader className={`${clsPrefix}--page-title`}>房源编辑</PageHeader>
            </div>
        );
    }
}

export default withRouter(HouseModifyHeader);
