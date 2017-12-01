import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Prompt } from 'react-router';
import BaseComponent from 'components/BaseComponent/index';
import ConfirmDialog from 'components/ConfirmDialog/index';

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
                    确定离开本页面吗？
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
