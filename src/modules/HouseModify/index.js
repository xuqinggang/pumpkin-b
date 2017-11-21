import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from 'components/BaseComponent/index';
import PageHeader from 'components/PageHeader/index';
import HouseEdit from 'modules/HouseEdit/index';
import './style.less';

class HouseModify extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleBack');
    }
    handleBack() {
        this.props.onBack();
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
                <HouseEdit houseId={this.props.houseId} />
            </div>
        );
    }
}

HouseModify.propTypes = {
    onBack: PropTypes.func,
    houseId: PropTypes.number,
};

HouseModify.defaultProps = {
    onBack: () => {},
    houseId: null,
};

export default HouseModify;
