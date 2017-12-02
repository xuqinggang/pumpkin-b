import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Prompt } from 'react-router';
import BaseComponent from 'components/BaseComponent/index';
import ConfirmDialog from 'components/ConfirmDialog/index';
import houseLocalStorage from '../../houseLocalStorage';

class LeavePrompt extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            leaveBlock: props.when,
            hide: true,
        };
        this.autoBind('handlePrompt', 'handleCancel', 'handleConfirm');
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.when !== this.props.when) {
            this.setState({
                leaveBlock: nextProps.when,
            });
        }
    }
    handleCancel() {
        this.setState({
            hide: true,
        });
    }
    handlePrompt(location) {
        if (window.location.pathname === location.pathname) return;

        this.setState({
            hide: false,
        });

        this.handleConfirm = () => {
            this.setState({
                leaveBlock: false,
            }, () => {
                this.props.history.push({
                    pathname: location.pathname,
                });
            });
            // 需求，确定离开就清除localStorage
            houseLocalStorage.clear();
        };
        return false;
    }
    render() {
        return (
            <div>
                <Prompt
                    when={this.state.leaveBlock}
                    message={this.handlePrompt}
                />
                <ConfirmDialog
                    hide={this.state.hide}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                >
                    <div>确定离开当前页面吗？</div>
                    <div>您有未保存的房源信息</div>
                </ConfirmDialog>
            </div>
        );
    }
}

LeavePrompt.propTypes = {
    when: PropTypes.bool,
};

LeavePrompt.defaultProps = {
    when: true,
};

export default withRouter(LeavePrompt);
