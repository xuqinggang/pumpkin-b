import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BaseComponent from 'components/BaseComponent/index';
import ConfirmDialog from 'components/ConfirmDialog/index';
import houseLocalStorage from '../../houseLocalStorage';
import { initState } from '../../actions';

class EnterPrompt extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            hide: !props.when,
        };
        this.autoBind('handleCancel', 'handleConfirm');
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.when !== this.props.when) {
            this.setState({
                hide: !nextProps.when,
            });
        }
    }
    handleConfirm() {
        const localHouseState = houseLocalStorage.get();
        if (localHouseState) {
            this.props.dispatch(initState(localHouseState));
        }
        this.setState({
            hide: true,
        });
    }
    handleCancel() {
        this.setState({
            hide: true,
        });
    }
    render() {
        return (
            <div>
                <ConfirmDialog
                    hide={this.state.hide}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                >
                    你之前有未保存的数据，是否加载这些数据？
                </ConfirmDialog>
            </div>
        );
    }
}

EnterPrompt.propTypes = {
    when: PropTypes.bool,
};

EnterPrompt.defaultProps = {
    when: false,
};

export default connect()(withRouter(EnterPrompt));
