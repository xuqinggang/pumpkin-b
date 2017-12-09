import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style.less';

class LoadingHouseNote extends Component {
    render() {
        return this.props.isLoading ?
            (
                <div className="m-loading-house-note">
                    正在加载中...
                </div>
            )
            : null;
    }
}

LoadingHouseNote.propTypes = {
    isLoading: PropTypes.bool,
};

LoadingHouseNote.defaultProps = {
    isLoading: false,
};

export default connect(
    (state) => {
        const isLoading = state.houseManage.fetchLoading;
        return {
            isLoading,
        };
    },
)(LoadingHouseNote);
