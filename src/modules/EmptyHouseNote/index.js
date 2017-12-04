import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BaseComponent from 'components/BaseComponent/index';
import Button from 'components/Button/index';
import './style.less';

class EmptyHouseNote extends BaseComponent {
    constructor(props) {
        super(props);
        this.autoBind('handleClick');
    }
    handleClick() {
        this.props.history.push('/house-upload');
    }
    render() {
        return !this.props.hide ?
            (
                <div className="m-empty-house-note">
                    <div>该账号暂无房源，快去上传吧</div>
                    <Button
                        type="confirm"
                        onClick={this.handleClick}
                    >上传房源</Button>
                </div>
            )
            : null;
    }
}

EmptyHouseNote.propTypes = {
    hide: PropTypes.bool,
};

EmptyHouseNote.defaultPropTypes = {
    hide: true,
};

export default connect(
    (state) => {
        let hide = true;
        const filter = state.houseManage.filter;
        const houseList = state.houseManage.houseList;
        if (filter.rentalType === 'ALL' &&
            filter.village === 'ALL' &&
            filter.roomStatus === 'ALL' &&
            houseList.length === 0) {
            hide = false;
        }
        return {
            hide,
        };
    },
)(withRouter(EmptyHouseNote));
