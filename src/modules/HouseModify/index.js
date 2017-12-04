import React from 'react';
import { withRouter } from 'react-router-dom';
import BaseComponent from 'components/BaseComponent/index';
import PageHeader from 'components/PageHeader/index';
import HouseEdit from 'modules/HouseEdit/index';
import { decodeQuerySting } from 'utils/index';
import './style.less';

class HouseModify extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            houseId: null,
        };
        this.autoBind('handleBack', 'handleTurnPage');
    }
    handleBack() {
        this.props.history.push({
            pathname: '/house-manage',
        });
    }
    handleTurnPage(houseId) {
        if (houseId) {
            this.setState({
                houseId,
            });
        }
    }
    componentDidMount() {
        const search = decodeQuerySting(window.location.search);
        this.handleTurnPage(Number(search.houseId));
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
                    <span className={`${clsPrefix}--title`}>房源编辑 (房源ID: {this.state.houseId})</span>
                </div>
                <PageHeader className={`${clsPrefix}--page-title`}>房源编辑</PageHeader>
                {
                    this.state.houseId
                    ? <HouseEdit houseId={this.state.houseId} />
                    : null
                }
            </div>
        );
    }
}

export default withRouter(HouseModify);
